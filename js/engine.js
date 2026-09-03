import * as THREE from "three";
import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import CameraControls from "./controls.js";
import SceneManager from "./sceneManager.js";

export default class Engine {

    constructor() {
        this.viewer = document.getElementById("viewer");
    }

    start() {

        const width = this.viewer.clientWidth;
        const height = this.viewer.clientHeight;

        this.scene = createScene();
        this.sceneManager = new SceneManager(this.scene);
        this.camera = createCamera(width, height);

        this.renderer = createRenderer(width, height);

        this.viewer.innerHTML = "";
        this.viewer.appendChild(this.renderer.domElement);
        this.controls = new CameraControls(
        this.camera,
        this.renderer.domElement
        );
        window.addEventListener("resize", () => this.onResize());

        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshNormalMaterial();

        const cube = new THREE.Mesh(geometry, material);

        cube.position.y = 0.5;

        this.sceneManager.add(cube);

        this.animate();
    }

    onResize() {

        const width = this.viewer.clientWidth;
        const height = this.viewer.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);

    }

    animate = () => {

        requestAnimationFrame(this.animate);

        this.renderer.render(
            this.scene,
            this.camera
        );

    }

}