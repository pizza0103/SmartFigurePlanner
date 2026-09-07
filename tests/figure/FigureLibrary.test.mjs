import assert from "node:assert/strict";
import test from "node:test";
import FigureFactory from "../../js/figure/FigureFactory.js";
import FigureLibrary from "../../js/figure/FigureLibrary.js";

test("figure library stores available figure instances without placing them", () => {
    const library = new FigureLibrary();
    const figure = FigureFactory.create("figure_001", "Mario");

    library.addFigure(figure);

    assert.deepEqual(library.getFigures(), [figure]);
    assert.equal(figure.getMesh().parent, null);
});

test("figure library removes an available figure", () => {
    const library = new FigureLibrary();
    const mario = FigureFactory.create("figure_001", "Mario");
    const luigi = FigureFactory.create("figure_002", "Luigi");

    library.addFigure(mario);
    library.addFigure(luigi);
    library.removeFigure(mario);

    assert.deepEqual(library.getFigures(), [luigi]);
});
