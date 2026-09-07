import * as THREE from "three";

export default class Cabinet {

    constructor() {

        this.mesh = this.createMesh();

    }

    createMesh() {

        const geometry = new THREE.BoxGeometry(8, 5, 4);
        const material = new THREE.MeshBasicMaterial({
            color: 0x8ab4f8,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 2.5;
        mesh.raycast = () => {};

        return mesh;

    }

    getMesh() {

        return this.mesh;

    }

}
