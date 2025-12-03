"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three-stdlib";
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";

// ==========================================
// 🔧 EASY CONFIGURATION ZONE
// ==========================================
const SCENE_CONFIG = {
    // 1. SIZE: Change this number to make them bigger or smaller
    scale: 0.50,

    // 2. POSITIONS: [X, Y, Z] coordinates for each of the 4 Poneglyphs
    // X: Left(-) / Right(+)
    // Y: Down(-) / Up(+)
    // Z: Far(-) / Near(+)
    positions: [
        [-2.5, 1.2, 0], // Top Left
        [2.5, 1.2, 0], // Top Right
        [-2.5, -1.2, 0], // Bottom Left
        [2.5, -1.2, 0]  // Bottom Right
    ],

    // 3. COLORS
    baseColor: 0x961212,   // Dark Red
    hoverColor: 0xff2b2b,  // Bright Red (Glow)
};

interface PoneglyphSceneProps {
    onSelect: (index: number | null) => void;
    selectedIndex: number | null;
    onHover?: (index: number | null) => void;
}

export default function PoneglyphScene({ onSelect, selectedIndex, onHover }: PoneglyphSceneProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const selectedIndexRef = useRef(selectedIndex);
    const lastHoveredIndexRef = useRef<number | null>(null);

    useEffect(() => {
        selectedIndexRef.current = selectedIndex;
    }, [selectedIndex]);

    useEffect(() => {
        if (!mountRef.current) return;

        const root = mountRef.current;
        const scene = new THREE.Scene();
        scene.background = null;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(root.clientWidth, root.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        root.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(40, root.clientWidth / root.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 8);

        // Lighting
        const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 0.6);
        scene.add(hemi);
        const dir = new THREE.DirectionalLight(0xffeedd, 0.8);
        dir.position.set(5, 10, 7);
        scene.add(dir);

        scene.add(new THREE.AmbientLight(0x202033, 0.6));

        // Postprocessing
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(root.clientWidth, root.clientHeight),
            0.3, 0.6, 0.1
        );
        composer.addPass(bloomPass);

        // Raycaster
        const ray = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        // Load STL
        const loader = new STLLoader();
        const instances: THREE.Mesh[] = [];

        loader.load('/models/red-poneglyph.stl', (geometry) => {
            geometry.computeBoundingBox();
            geometry.center();
            geometry.computeVertexNormals();

            const mat = new THREE.MeshStandardMaterial({
                color: SCENE_CONFIG.baseColor,
                metalness: 0.15,
                roughness: 0.45,
                emissive: new THREE.Color(0x000000),
                emissiveIntensity: 0.0,
            });

            const prototype = new THREE.Mesh(geometry, mat);
            prototype.scale.setScalar(SCENE_CONFIG.scale);

            for (let i = 0; i < 4; i++) {
                const m = prototype.clone();
                m.material = mat.clone();

                const [x, y, z] = SCENE_CONFIG.positions[i];
                m.position.set(x, y, z);

                m.rotation.set(-0.2, (i % 2 ? 0.2 : -0.2), 0);
                m.userData = { id: i, hover: false, baseScale: 1.0 };
                scene.add(m);
                instances.push(m);
            }
        }, undefined, (err) => {
            console.error('STL load error', err);
        });

        // Animation variables
        let t = 0;
        let animationFrameId: number;

        const onPointerMove = (e: PointerEvent) => {
            if (!root) return;
            const rect = root.getBoundingClientRect();
            pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        root.addEventListener('pointermove', onPointerMove);

        const onPointerDown = (e: PointerEvent) => {
            if (!root) return;
            const rect = root.getBoundingClientRect();
            pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            ray.setFromCamera(pointer, camera);
            const intersects = ray.intersectObjects(instances, true);

            if (intersects.length > 0) {
                const hit = intersects[0].object as THREE.Mesh;
                const clickedIndex = hit.userData.id;
                onSelect(clickedIndex);
            } else {
                onSelect(null);
            }
        };
        root.addEventListener('pointerdown', onPointerDown);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            t += 0.01;

            const currentSelected = selectedIndexRef.current;

            // Update Instances
            instances.forEach((m, i) => {
                const isSelected = currentSelected === i;
                const isAnySelected = currentSelected !== null;

                let targetPos = new THREE.Vector3();
                let targetScale = SCENE_CONFIG.scale;
                let targetRotY = m.rotation.y + 0.002; // Default spin

                if (isAnySelected) {
                    if (isSelected) {
                        // FOCUS MODE: Move to left, enlarge
                        targetPos.set(-2.5, 0, 2); // Closer and to the left
                        targetScale = SCENE_CONFIG.scale * 2.0;
                        targetRotY = m.rotation.y + 0.005; // Slower spin in focus
                    } else {
                        // HIDDEN MODE: Shrink away
                        const [defX, defY, defZ] = SCENE_CONFIG.positions[i];
                        targetPos.set(defX, defY, defZ);
                        targetScale = 0;
                    }
                } else {
                    // GRID MODE: Default positions
                    const [defX, defY, defZ] = SCENE_CONFIG.positions[i];
                    targetPos.set(defX, defY, defZ);
                    targetPos.y += Math.sin(t + i) * 0.0008; // Floating
                }

                // Apply Lerps
                m.position.lerp(targetPos, 0.08);

                const currentScale = m.scale.x; // Assuming uniform scale
                const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
                m.scale.setScalar(nextScale);

                m.rotation.y = targetRotY;
            });

            // Hover & Bloom Logic
            ray.setFromCamera(pointer, camera);
            const intersects = ray.intersectObjects(instances, true);

            let hoveredAny = false;
            let currentHoverIndex: number | null = null;

            if (currentSelected === null) {
                // Only show hover effects if nothing is selected (Grid Mode)
                if (intersects.length) {
                    const hit = intersects[0].object as THREE.Mesh;
                    hoveredAny = true;
                    currentHoverIndex = hit.userData.id;

                    // Reset others
                    instances.forEach(m => {
                        if (m !== hit) {
                            const mat = m.material as THREE.MeshStandardMaterial;
                            mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.0, 0.1);
                        }
                    });

                    // Highlight hit
                    const mat = hit.material as THREE.MeshStandardMaterial;
                    mat.emissive = new THREE.Color(SCENE_CONFIG.hoverColor);
                    // Reduced intensity from 0.5 to 0.3
                    mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.3, 0.18);

                    // Slight scale up on hover
                    const targetHoverScale = SCENE_CONFIG.scale * 1.15;
                    hit.scale.lerp(new THREE.Vector3(targetHoverScale, targetHoverScale, targetHoverScale), 0.14);
                    hit.rotation.y += 0.05;

                    // Reduced bloom strength from 0.4 to 0.2
                    bloomPass.strength = THREE.MathUtils.lerp(bloomPass.strength, 0.2, 0.12);
                }
            }

            // Report hover change
            if (currentHoverIndex !== lastHoveredIndexRef.current) {
                lastHoveredIndexRef.current = currentHoverIndex;
                if (onHover) onHover(currentHoverIndex);
            }

            if (!hoveredAny) {
                // Reset all emissive/bloom if not hovering or if selected
                instances.forEach(m => {
                    const mat = m.material as THREE.MeshStandardMaterial;
                    // Keep selected one glowing slightly?
                    if (currentSelected === m.userData.id) {
                        mat.emissive = new THREE.Color(SCENE_CONFIG.hoverColor);
                        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.5, 0.1);
                    } else {
                        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.0, 0.1);
                    }
                });
                bloomPass.strength = THREE.MathUtils.lerp(bloomPass.strength, 0.15, 0.06);
            }

            composer.render();
        };

        animate();

        const handleResize = () => {
            if (!root) return;
            const w = root.clientWidth;
            const h = root.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            composer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            root.removeEventListener('pointermove', onPointerMove);
            root.removeEventListener('pointerdown', onPointerDown);
            cancelAnimationFrame(animationFrameId);
            if (root.contains(renderer.domElement)) {
                root.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full cursor-pointer" />;
}
