import assert from "node:assert/strict";
import test from "node:test";
import * as THREE from "three";
import Cabinet from "../../js/cabinet/Cabinet.js";

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
