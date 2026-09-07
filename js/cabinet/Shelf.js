import * as THREE from "three";

export default class Shelf {

    constructor(y) {

        this.mesh = this.createMesh();
        this.mesh.position.y = y;

    }

    createMesh() {

        const geometry = new THREE.BoxGeometry(7.6, 0.12, 3.6);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.raycast = () => {};

        return mesh;

    }

    getMesh() {

        return this.mesh;

    }

}
