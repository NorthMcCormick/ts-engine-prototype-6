// import { Actor } from "./actor.class";

import { Scene, Vector3, CannonJSPlugin } from "@babylonjs/core";
import { AActor } from "./actor";

export class AScene {
	sceneName: string;
	_scene: Scene;
	_gravityVector: Vector3 =  new Vector3(0, -9.81, 0);
	// _physicsPlugin: BABYLON.OimoJSPlugin = new BABYLON.OimoJSPlugin();
	_physicsPlugin: CannonJSPlugin = new CannonJSPlugin();
	
	_actors: any[] = [];

	initScene(_engine, _canvas) {
		this._scene = new Scene(_engine);
		this._scene.enablePhysics(this._gravityVector, this._physicsPlugin);

		console.log(`Scene: Init ${ this.sceneName }`);
	}

	addActor(actor: AActor) {
		if (actor.sceneBeforeRender) {
			this._actors.push(actor);
		}
	}

	getActors() {
		return this._actors;
	}

	getScene() {
		return this._scene;
	}

	sceneBeforeRender(deltaTime) {

	}
}