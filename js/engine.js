import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import CameraControls from "./controls.js";
import SceneManager from "./SceneManager.js";
import { FigureFactory } from "./figure";

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
