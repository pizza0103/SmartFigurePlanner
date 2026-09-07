import assert from "node:assert/strict";
import test from "node:test";
import Figure from "../../js/figure/Figure.js";

test("update synchronizes figure transforms to its mesh", () => {
    const figure = new Figure("figure_001", "Mario");

    figure.position.set(2, 3, 4);
    figure.rotation.set(0.1, 0.2, 0.3);
    figure.scale.set(1.5, 2, 2.5);

    figure.update();

    assert.deepEqual(figure.getMesh().position.toArray(), [2, 3, 4]);
    assert.deepEqual(figure.getMesh().rotation.toArray(), [0.1, 0.2, 0.3, "XYZ"]);
    assert.deepEqual(figure.getMesh().scale.toArray(), [1.5, 2, 2.5]);
});
