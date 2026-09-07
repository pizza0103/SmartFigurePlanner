import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import CameraControls from "./controls.js";
import SceneManager from "./SceneManager.js";
import { FigureFactory } from "./figure/index.js";
import Cabinet from "./cabinet/Cabinet.js";
import * as THREE from "three";

export default class Engine {

    constructor() {
        this.viewer = document.getElementById("viewer");
        this.selectedFigure = null;
        this.isDragging = false;
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        this.dragIntersection = new THREE.Vector3();
        this.dragOffset = new THREE.Vector3();
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
        window.addEventListener(
            "pointermove",
            event => this.handleDragMove(event)
        );
        window.addEventListener("resize", () => this.onResize());

        this.cabinet = new Cabinet();
        this.sceneManager.add(this.cabinet.getMesh());

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

        this.setRayFromPointer(event);

        const intersections = this.raycaster.intersectObjects(
            this.sceneManager.objects
        );

        return intersections[0]?.object.userData.figure ?? null;

    }

    setRayFromPointer(event) {

        const rect = this.renderer.domElement.getBoundingClientRect();

        this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, this.camera);

    }

    handleDragStart(event) {

        this.isDragging =
            event.button === 0 &&
            this.getFigureAt(event) === this.selectedFigure;

        if (!this.isDragging || !this.updateDragIntersection(event)) {
            this.isDragging = false;
            return;
        }

        this.dragOffset
            .copy(this.selectedFigure.position)
            .sub(this.dragIntersection);

    }

    handleDragEnd(event) {

        if (event.button === 0) {
            this.isDragging = false;
        }

    }

    handleDragMove(event) {

        if (!this.isDragging) return;

        if (!this.updateDragIntersection(event)) return;

        this.selectedFigure.position
            .copy(this.dragIntersection)
            .add(this.dragOffset);

        this.selectedFigure.update();

    }

    updateDragIntersection(event) {

        this.setRayFromPointer(event);

        return this.raycaster.ray.intersectPlane(
            this.dragPlane,
            this.dragIntersection
        ) !== null;

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
