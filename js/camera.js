import * as THREE from "three";

export function createCamera(width, height) {
    const camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1000
    );

    camera.position.set(5, 5, 5);

    camera.lookAt(0, 0, 0);
    
    camera.userData.radius = 8;

    camera.userData.theta = Math.PI / 4;

    camera.userData.phi = Math.PI / 4;
    return camera;
}