export default class SceneManager {

    constructor(scene) {

        this.scene = scene;

        this.objects = [];

    }

    add(object) {

        this.scene.add(object);

        this.objects.push(object);

    }

    remove(object) {

        this.scene.remove(object);

        this.objects = this.objects.filter(item => item !== object);

    }

    clear() {

        this.objects.forEach(object => {

            this.scene.remove(object);

        });

        this.objects = [];

    }

}