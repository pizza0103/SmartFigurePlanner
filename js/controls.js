import * as THREE from "three";
export default class CameraControls {

    constructor(camera, domElement) {
        this.rotationSpeed = 0.005;
        this.zoomSpeed = 0.01;
        this.target = new THREE.Vector3(0, 0, 0);
        this.minRadius = 2;
        this.maxRadius = 20;
        this.panSpeed = 0.01;
        this.camera = camera;
        this.domElement = domElement;
        this.isDragging = false;
        this.currentAction = null;
        this.previousMouse = {
            x: 0,
            y: 0
        };
        this.initEvents();
        
    }

    initEvents() {

        this.domElement.addEventListener(
            "pointerdown",
            this.onPointerDown
        );

        window.addEventListener(
            "pointermove",
            this.onPointerMove
        );

        this.domElement.addEventListener(
            "wheel",
            this.onMouseWheel,
            { passive: false }
        );

        window.addEventListener(
            "pointerup",
            this.onPointerUp
        );

    }

    onPointerDown = (event) => {

        this.isDragging = true;

        if (event.button === 0) {
            this.currentAction = "orbit";
        }
        else if (event.button === 2) {
            this.currentAction = "pan";
        }
        else {
            this.currentAction = null;
        }
        this.previousMouse.x = event.clientX;
        this.previousMouse.y = event.clientY;

        console.log("Drag Start");
    }

    onPointerMove = (event) => {

    if (!this.isDragging) return;

    const deltaX = event.clientX - this.previousMouse.x;
    const deltaY = event.clientY - this.previousMouse.y;

    if (this.currentAction === "orbit") {

        console.log(deltaX, deltaY);

        this.camera.userData.theta -= deltaX * this.rotationSpeed;

        this.camera.userData.phi -= deltaY * this.rotationSpeed;

        const EPS = 0.1;

        this.camera.userData.phi = Math.max(
            EPS,
            Math.min(
                Math.PI - EPS,
                this.camera.userData.phi
            )
        );
    
        this.updateCameraPosition();
    }
    else if (this.currentAction === "pan") {
        const forward = new THREE.Vector3();

        this.camera.getWorldDirection(forward);

        const right = new THREE.Vector3();

        right.crossVectors(
            forward,
            new THREE.Vector3(0, 1, 0)
        ).normalize();

        const up = new THREE.Vector3();

        up.crossVectors(
            right,
            forward
        ).normalize();

        const movement = new THREE.Vector3();

        movement.addScaledVector(
            right,
            -deltaX * this.panSpeed
        );

        movement.addScaledVector(
            up,
            deltaY * this.panSpeed
        );

        this.camera.position.add(movement);

        this.target.add(movement);

        this.camera.lookAt(this.target);

    }

    this.previousMouse.x = event.clientX;
    this.previousMouse.y = event.clientY;
}

    onPointerUp = () => {

        this.isDragging = false;

        console.log("Drag End");

    }

    onMouseWheel = (event) => {

        event.preventDefault();

        // 줌 속도
        this.camera.userData.radius +=
            event.deltaY * this.zoomSpeed;

    

        // 최소/최대 거리 제한
        this.camera.userData.radius = Math.max(
            this.minRadius,
            Math.min(
                this.maxRadius,
                this.camera.userData.radius
                )
            );

        
        this.updateCameraPosition();

    }
    
    updateCameraPosition() {

        const radius = this.camera.userData.radius;
        const theta = this.camera.userData.theta;
        const phi = this.camera.userData.phi;

        this.camera.position.x =
            radius * Math.sin(phi) * Math.sin(theta);

        this.camera.position.y =
            radius * Math.cos(phi);

        this.camera.position.z =
            radius * Math.sin(phi) * Math.cos(theta);

        this.camera.lookAt(this.target);
    }
}