
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';
import { GLTFExporter } from 'three-stdlib';
import { JSDOM } from 'jsdom';

// Mock browser environment for Three.js
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.self = dom.window;
global.HTMLElement = dom.window.HTMLElement;
global.HTMLImageElement = dom.window.HTMLImageElement; // often needed
global.Image = dom.window.Image;

const rootDir = process.cwd();

async function findFiles(dir, extensions) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                results = results.concat(await findFiles(filePath, extensions));
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (extensions.includes(ext)) {
                results.push(filePath);
            }
        }
    }
    return results;
}

async function convertPngToWebp(filePath) {
    const newPath = filePath.replace(/\.png$/i, '.webp');
    try {
        await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(newPath);
        console.log(`Converted: ${filePath} -> ${newPath}`);
    } catch (err) {
        console.error(`Error converting ${filePath}:`, err);
    }
}

async function convertStlToGlb(filePath) {
    const newPath = filePath.replace(/\.stl$/i, '.glb');
    try {
        const data = fs.readFileSync(filePath);
        // STLLoader expects an ArrayBuffer
        const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);

        const loader = new STLLoader();
        const geometry = loader.parse(arrayBuffer);
        const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
        const mesh = new THREE.Mesh(geometry, material);

        const exporter = new GLTFExporter();
        exporter.parse(
            mesh,
            (gltf) => {
                const buffer = Buffer.from(gltf);
                fs.writeFileSync(newPath, buffer);
                console.log(`Converted: ${filePath} -> ${newPath}`);
            },
            (err) => {
                console.error(`Error exporting GLB for ${filePath}:`, err);
            },
            { binary: true }
        );
    } catch (err) {
        console.error(`Error converting ${filePath}:`, err);
    }
}

async function main() {
    console.log('Starting asset conversion...');

    const pngFiles = await findFiles(rootDir, ['.png']);
    console.log(`Found ${pngFiles.length} PNG files.`);
    for (const file of pngFiles) {
        await convertPngToWebp(file);
    }

    const stlFiles = await findFiles(rootDir, ['.stl']);
    console.log(`Found ${stlFiles.length} STL files.`);
    for (const file of stlFiles) {
        await convertStlToGlb(file);
    }

    console.log('Conversion complete.');
}

main();
