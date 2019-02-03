

// import { Input } from '../../engine/input.class';
import { AActor } from '../../engine/actor';
import { PhysicsImpostor, MeshBuilder, Vector3, Material, StandardMaterial, Color3 } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials';

import { Mesh } from "@babylonjs/core/Meshes/mesh";

import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Meshes/Builders/boxBuilder";
import { AInput } from '../../engine/input';

export class Player extends AActor {
	mesh: Mesh;
	inputManager: AInput;

	constructor(_scene) {
		super(_scene);

		this.inputManager = AInput.getInstance();
		this.inputManager.init();

		this.mesh = MeshBuilder.CreateBox("box", {
			size: 3.0
		}, this._scene);

		this.mesh.position.x = -3;
		this.mesh.position.y = 3;
		this.mesh.position.z = 8;

		var material = new StandardMaterial('uh', this._scene); // new GridMaterial("grid", this._scene);
		material.ambientColor = new Color3(1, 0, 0);
		this.mesh.material = material;
		// this.mesh.material = material;

		/*this.mesh = Mesh.CreateBox('box', 3, this._scene);

		this.mesh.position.x = -3;
		this.mesh.position.y = 3;
		this.mesh.position.z = 8;*/

		this.mesh.physicsImpostor = new PhysicsImpostor(this.mesh, PhysicsImpostor.BoxImpostor, { mass: 90, restitution: 0.05 }, this._scene);

		/// this.mesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(20, 0, 0));

	}

	sceneBeforeRender(deltaTime) {
		super.sceneBeforeRender(deltaTime);

		this.inputManager.update();

		// console.log(this.inputManager.padAAxesStatus);

		let horizontalAcceleration = '0', 
				verticalAcceleration = '0';

		if (this.mesh.physicsImpostor) {
			if (this.inputManager.padAAxesStatus[this.inputManager.padAAxesMap["J-LEFT-HORIZONTAL"]]) {
				horizontalAcceleration = this.inputManager.padAAxesStatus[this.inputManager.padAAxesMap["J-LEFT-HORIZONTAL"]];
	
				horizontalAcceleration = horizontalAcceleration;
	
				// this.mesh.position.x += horizontalAcceleration;

			}	
	
			if (this.inputManager.padAAxesStatus[this.inputManager.padAAxesMap["J-LEFT-VERTICAL"]]) {
				verticalAcceleration = this.inputManager.padAAxesStatus[this.inputManager.padAAxesMap["J-LEFT-VERTICAL"]];
	
				verticalAcceleration = verticalAcceleration;
	
				// this.mesh.position.z += verticalAcceleration;
			}	

			let sensitivity = 10;

			this.mesh.physicsImpostor.setLinearVelocity(new Vector3( -(parseFloat(horizontalAcceleration) * sensitivity), 0, -(parseFloat(verticalAcceleration) * sensitivity)));
		}

	}
	
}