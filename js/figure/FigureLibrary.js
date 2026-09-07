export default class FigureLibrary {

    constructor() {

        this.figures = [];

    }

    addFigure(figure) {

        this.figures.push(figure);

    }

    removeFigure(figure) {

        this.figures = this.figures.filter(item => item !== figure);

    }

    getFigures() {

        return this.figures;

    }

}
