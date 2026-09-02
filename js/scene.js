import * as THREE from "three";

export function createScene() {

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xdfeaf5);

    //----------------------------------
    // Grid
    //----------------------------------

    const grid = new THREE.GridHelper(
        20,     // 전체 크기
        20      // 칸 개수
    );

    scene.add(grid);

    //----------------------------------
    // XYZ 축
    //----------------------------------

    const axes = new THREE.AxesHelper(3);

    scene.add(axes);

    return scene;

}