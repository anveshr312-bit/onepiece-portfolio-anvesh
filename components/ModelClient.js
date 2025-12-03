// components/ModelClient.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ModelClient() {
    const mountRef = useRef();

    useEffect(() => {
        let mounted = true;
        let req = null;
        const el = mountRef.current;
        if (!el) return;

        // Basic scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000);
        camera.position.set(0, 1.5, 3);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(el.clientWidth, el.clientHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        el.appendChild(renderer.domElement);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 10, 7.5);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x666666));

        const loader = new GLTFLoader();

        // Helper: try to set MeshoptDecoder then Draco, but it's safe if one is missing.
        (async () => {
            // Attempt MeshoptDecoder first (works if model uses EXT_meshopt_compression)
            try {
                const { MeshoptDecoder } = await import('three/examples/jsm/libs/meshopt_decoder.module.js');
                if (MeshoptDecoder) {
                    // MeshoptDecoder.ready is a Promise that resolves when decoder loaded
                    await MeshoptDecoder.ready;
                    loader.setMeshoptDecoder(MeshoptDecoder);
                    console.log('[ModelClient] MeshoptDecoder ready');
                }
            } catch (e) {
                // not fatal: Meshopt decoder not available; no-op
                console.warn('[ModelClient] MeshoptDecoder not available', e);
            }

            // Then try Draco (only needed if file is Draco-compressed)
            try {
                const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
                const dracoLoader = new DRACOLoader();
                // IMPORTANT: decoder files must be served from /decoders/
                dracoLoader.setDecoderPath('/decoders/');
                loader.setDRACOLoader(dracoLoader);
                console.log('[ModelClient] DRACOLoader set with /decoders/');
            } catch (e) {
                // not fatal: skip draco loader
                console.warn('[ModelClient] DRACOLoader not available', e);
            }

            // Now load the GLB (replace path with your file)
            loader.load('/models/red-poneglyph.draco.glb', (gltf) => {
                if (!mounted) return;
                // Simple centering and scale if needed
                const root = gltf.scene;
                root.traverse((n) => {
                    if (n.isMesh) {
                        n.castShadow = true;
                        n.receiveShadow = true;
                    }
                });
                scene.add(root);
            }, undefined, (err) => {
                console.error('Model load error', err);
            });
        })();

        // Basic animation loop
        const clock = new THREE.Clock();
        function animate() {
            req = requestAnimationFrame(animate);
            const dt = clock.getDelta();
            // tiny rotation so it doesn't look dead
            scene.rotation.y += dt * 0.2;
            renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        const ro = new ResizeObserver(() => {
            const w = el.clientWidth, h = el.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        });
        ro.observe(el);

        return () => {
            mounted = false;
            if (req) cancelAnimationFrame(req);
            ro.disconnect();
            // clean scene and renderer
            renderer.dispose();
            el.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '420px' }} />;
}
