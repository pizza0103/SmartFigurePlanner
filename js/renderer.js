import * as THREE from "three";

export function createRenderer(width, height) {

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(width, height);

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    return renderer;

}