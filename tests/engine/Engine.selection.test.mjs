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
    engine.isDragging = false;
    engine.dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    engine.dragIntersection = new THREE.Vector3();
    engine.dragOffset = new THREE.Vector3();

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

test("pressing a selected figure starts drag mode without moving it", () => {
    const { engine, figure } = createEngineWithFigure();
    const initialPosition = figure.position.toArray();

    engine.selectedFigure = figure;
    engine.handleDragStart({ button: 0, clientX: 50, clientY: 50 });

    assert.equal(engine.isDragging, true);
    assert.deepEqual(figure.position.toArray(), initialPosition);
});

test("releasing the left mouse button stops drag mode", () => {
    const { engine } = createEngineWithFigure();

    engine.isDragging = true;
    engine.handleDragEnd({ button: 0 });

    assert.equal(engine.isDragging, false);
});

test("dragging stores the mouse intersection with the ground plane", () => {
    const { engine, figure } = createEngineWithFigure();
    const initialPosition = figure.position.toArray();

    engine.camera.position.set(0, 5, 5);
    engine.camera.lookAt(0, 0, 0);
    engine.camera.updateMatrixWorld();
    engine.selectedFigure = figure;
    engine.isDragging = true;

    engine.handleDragMove({ clientX: 50, clientY: 50 });

    assert.equal(engine.dragIntersection.y, 0);
    assert.deepEqual(figure.position.toArray(), initialPosition);
});

test("dragging moves the selected figure while preserving its height", () => {
    const { engine, figure } = createEngineWithFigure();

    figure.position.y = 0.5;
    figure.update();
    figure.getMesh().updateMatrixWorld();
    const initialPosition = figure.position.toArray();
    engine.camera.position.set(0, 5, 5);
    engine.camera.lookAt(0, 0, 0);
    engine.camera.updateMatrixWorld();
    engine.selectedFigure = figure;

    engine.handleDragStart({ button: 0, clientX: 50, clientY: 50 });
    engine.handleDragMove({ clientX: 60, clientY: 50 });

    assert.notDeepEqual(figure.position.toArray(), initialPosition);
    assert.equal(figure.position.y, 0.5);
    assert.deepEqual(figure.getMesh().position.toArray(), figure.position.toArray());
});

test("releasing drag prevents further figure movement", () => {
    const { engine, figure } = createEngineWithFigure();

    figure.position.y = 0.5;
    figure.update();
    figure.getMesh().updateMatrixWorld();
    const initialPosition = figure.position.toArray();
    engine.camera.position.set(0, 5, 5);
    engine.camera.lookAt(0, 0, 0);
    engine.camera.updateMatrixWorld();
    engine.selectedFigure = figure;

    engine.handleDragStart({ button: 0, clientX: 50, clientY: 50 });
    engine.handleDragMove({ clientX: 60, clientY: 50 });
    engine.handleDragEnd({ button: 0 });

    const positionAfterRelease = figure.position.toArray();

    assert.notDeepEqual(positionAfterRelease, initialPosition);

    engine.handleDragMove({ clientX: 70, clientY: 50 });

    assert.deepEqual(figure.position.toArray(), positionAfterRelease);
});
