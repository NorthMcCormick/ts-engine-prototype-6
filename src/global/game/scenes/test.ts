import { AScene } from "../../engine/scene";
import { Engine, FollowCamera, Vector3, MeshBuilder, PhysicsImpostor, HemisphericLight, StandardMaterial, Color3 } from "@babylonjs/core";
import { Player } from "../actors/player";

import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

export class SceneTest extends AScene {
	private _engine: Engine;
	private _camera: FollowCamera;
	private _player: Player;
	private _canvas: HTMLCanvasElement;
	private _light: HemisphericLight;

	constructor() {
		super();

		this.sceneName = 'test-vr';

		console.log(`Test Scene Instance ${ this.sceneName }`);
	}

	attachWebVR = () => {
		// this._camera.attachControl(this._canvas, true);

		window.removeEventListener('click', this.attachWebVR, false);
	}

	initScene(_engine, _canvas) {
		this._engine = _engine;
		this._canvas = _canvas;

		super.initScene(this._engine, _canvas);

		// this._scene.enablePhysics(this._gravityVector, this._physicsPlugin);

		this._player = new Player(this._scene);

		let ground = MeshBuilder.CreateGround("ground", {
			width: 512,
			height: 512,
			subdivisions: 32,
			updatable: false
		}, this._scene);

		ground.position.y = -1;

		var groundMaterial = new StandardMaterial('uh', this._scene); // new GridMaterial("grid", this._scene);
		groundMaterial.ambientColor = new Color3(0, 1, 0);

		ground.material = groundMaterial;

		ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this._scene);

		this._camera = new FollowCamera("FollowCam", new Vector3(0, 10, -10), this._scene, this._player.mesh); // = new BABYLON.VRDeviceOrientationGamepadCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), this._scene);

		this._camera.radius = 10;
		this._camera.heightOffset = 9;
		this._camera.rotationOffset = 0;
		this._camera.cameraAcceleration = 0.005;
		this._camera.maxCameraSpeed = 15;

		this._camera.attachControl(this._canvas, true);

		// this._camera = new FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), this._scene, this._player); // = new BABYLON.VRDeviceOrientationGamepadCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), this._scene);
		// this._camera.inputs.add(new FollowCameraDeviceOrientationInput());
	
		/*this._camera.setCameraRigMode(BABYLON.Camera.RIG_MODE_VR, {
			interaxialDistance: 0.0637
		});*/

		/*this._camera.radius = 10;
		this._camera.heightOffset = 9;
		this._camera.rotationOffset = 0;
		this._camera.cameraAcceleration = 0.005;
		this._camera.maxCameraSpeed = 15;

		this._camera.attachControl(this._canvas, true);*/


		this.addActor(this._player);
		
		// Input.getInstance().init();

		this._light = new HemisphericLight("light", new Vector3(0, 1, 0), this._scene);
	}

	sceneBeforeRender(deltaTime) {
		super.sceneBeforeRender(deltaTime);

		// let inputManager = Input.getInstance();
		// Input.getInstance().update();

		this.getActors().forEach((actor) => {
			actor.sceneBeforeRender(deltaTime);
		});


		/*if (Input.getInstance().buttonPressed('A', false)) {
			console.log('A!');
		}

		if (Input.getInstance().buttonPressed('A', true)) {
			console.log('AAA!');
		}

		if (Input.getInstance().buttonPressed('D-LEFT', false)) {
			console.log('Lefties!');
		}*/

		// console.log(inputManager.padAAxesStatus);

		// console.log((Input.getInstance().padAAxesStatus))
	

		// this._gamepadManager.update();

		/*if (this._gamepadManager.buttonPressed('A')) {
			console.log('a');

			this._swim = !this._swim;
		}*/
	}
}