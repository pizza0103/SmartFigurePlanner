import * as THREE from "three";

export default class Figure {

    constructor(id = null, name = "Unknown Figure") {

        this.id = id;

        this.name = name;

        this.position = new THREE.Vector3(0, 0.5, 0);

        this.rotation = new THREE.Euler(0, 0, 0);

        this.scale = new THREE.Vector3(1, 1, 1);

        this.mesh = this.createMesh();

    }

    createMesh() {

        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshNormalMaterial();

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.copy(this.position);

        mesh.rotation.copy(this.rotation);

        mesh.scale.copy(this.scale);

        mesh.userData.figure = this;

        return mesh;

    }

    update() {

        this.mesh.position.copy(this.position);
        this.mesh.rotation.copy(this.rotation);
        this.mesh.scale.copy(this.scale);

        return this;

    }

    getMesh() {

    return this.mesh;

    }

    getId() {

    return this.id;

    }

    getName() {

    return this.name;

    }
}
