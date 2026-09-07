import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import CameraControls from "./controls.js";
import SceneManager from "./SceneManager.js";
import { FigureFactory } from "./figure/index.js";
import * as THREE from "three";

export default class Engine {

    constructor() {
        this.viewer = document.getElementById("viewer");
        this.selectedFigure = null;
        this.isDragging = false;
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
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
        this.renderer.domElement.addEventListener(
            "click",
            event => this.handleSelection(event)
        );
        this.renderer.domElement.addEventListener(
            "pointerdown",
            event => this.handleDragStart(event)
        );
        window.addEventListener(
            "pointerup",
            event => this.handleDragEnd(event)
        );
        window.addEventListener("resize", () => this.onResize());

        const figures = [
            FigureFactory.create("figure_001", "Mario"),
            FigureFactory.create("figure_002", "Luigi"),
            FigureFactory.create("figure_003", "Peach")
        ];

        figures[0].position.set(-2, 0.5, 0);
        figures[1].position.set(0, 0.5, 0);
        figures[2].position.set(2, 0.5, 0);

        figures.forEach(figure => {

            figure.update();

            this.sceneManager.add(figure.getMesh());

        });
        this.animate();
    }

    handleSelection(event) {

        this.selectedFigure = this.getFigureAt(event);

    }

    getFigureAt(event) {

        const rect = this.renderer.domElement.getBoundingClientRect();

        this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, this.camera);

        const intersections = this.raycaster.intersectObjects(
            this.sceneManager.objects
        );

        return intersections[0]?.object.userData.figure ?? null;

    }

    handleDragStart(event) {

        this.isDragging =
            event.button === 0 &&
            this.getFigureAt(event) === this.selectedFigure;

    }

    handleDragEnd(event) {

        if (event.button === 0) {
            this.isDragging = false;
        }

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
