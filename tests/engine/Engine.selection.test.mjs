import assert from "node:assert/strict";
import test from "node:test";
import * as THREE from "three";
import Engine from "../../js/engine.js";
import Figure from "../../js/figure/Figure.js";

function createEngineWithFigure() {
    const figure = new Figure("figure_001", "Mario");

    figure.position.set(0, 0, 0);
    figure.update();
    figure.getMesh().updateMatrixWorld();

    const engine = Object.create(Engine.prototype);

    engine.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    engine.camera.position.set(0, 0, 5);
    engine.camera.lookAt(0, 0, 0);
    engine.camera.updateMatrixWorld();
    engine.renderer = {
        domElement: {
            getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
        }
    };
    engine.sceneManager = { objects: [figure.getMesh()] };
    engine.raycaster = new THREE.Raycaster();
    engine.pointer = new THREE.Vector2();
    engine.selectedFigure = null;

    return { engine, figure };
}

test("clicking a figure stores its Figure instance as selected", () => {
    const { engine, figure } = createEngineWithFigure();

    engine.handleSelection({ clientX: 50, clientY: 50 });

    assert.equal(engine.selectedFigure, figure);
});

test("clicking empty space clears the selected figure", () => {
    const { engine, figure } = createEngineWithFigure();

    engine.selectedFigure = figure;
    engine.handleSelection({ clientX: 0, clientY: 0 });

    assert.equal(engine.selectedFigure, null);
});
