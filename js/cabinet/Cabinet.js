import * as THREE from "three";
import Shelf from "./Shelf.js";

export default class Cabinet {

    constructor() {

        this.mesh = this.createMesh();
        this.shelves = this.createShelves();

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

    createShelves() {

        return [1.25, 2.5, 3.75].map(y => new Shelf(y));

    }

    getShelves() {

        return this.shelves;

    }

}
