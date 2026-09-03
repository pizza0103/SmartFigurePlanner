import * as THREE from "three";

export default class Figure {

    constructor() {

        this.mesh = this.createMesh();

    }

    createMesh() {

        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshNormalMaterial();

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 0.5;

        return mesh;

    }

}