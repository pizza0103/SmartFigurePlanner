import assert from "node:assert/strict";
import test from "node:test";
import * as THREE from "three";
import Cabinet from "../../js/cabinet/Cabinet.js";
import Shelf from "../../js/cabinet/Shelf.js";

test("cabinet creates a transparent box mesh above the ground", () => {
    const cabinet = new Cabinet();
    const mesh = cabinet.getMesh();

    assert.equal(mesh, cabinet.mesh);
    assert.equal(mesh.geometry.type, "BoxGeometry");
    assert.equal(mesh.material.transparent, true);
    assert.equal(mesh.material.depthWrite, false);
    assert.ok(mesh.position.y > 0);
});

test("cabinet mesh does not block figure raycasting", () => {
    const cabinet = new Cabinet();
    const raycaster = new THREE.Raycaster();

    raycaster.set(new THREE.Vector3(0, 2.5, 10), new THREE.Vector3(0, 0, -1));

    assert.deepEqual(raycaster.intersectObject(cabinet.getMesh()), []);
});

test("shelf creates a thin box mesh without blocking figure raycasting", () => {
    const shelf = new Shelf(1.25);
    const raycaster = new THREE.Raycaster();

    raycaster.set(new THREE.Vector3(0, 1.25, 10), new THREE.Vector3(0, 0, -1));

    assert.equal(shelf.getMesh().geometry.type, "BoxGeometry");
    assert.ok(shelf.getMesh().geometry.parameters.height < 1);
    assert.deepEqual(raycaster.intersectObject(shelf.getMesh()), []);
});

test("cabinet owns multiple shelves", () => {
    const cabinet = new Cabinet();
    const shelves = cabinet.getShelves();

    assert.equal(shelves.length, 3);
    assert.ok(shelves.every(shelf => shelf instanceof Shelf));
});
