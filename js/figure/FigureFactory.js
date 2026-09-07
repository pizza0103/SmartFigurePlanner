import Figure from "./Figure.js";

export default class FigureFactory {

    static create(id, name) {

        return new Figure(id, name);

    }

}