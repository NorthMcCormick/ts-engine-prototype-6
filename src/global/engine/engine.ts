import { Engine, Scene } from "@babylonjs/core";
import { AScene } from "./scene";

export class AEngine {
  private static instance: AEngine;
  
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene: Scene;
   
  private currentScene: AScene;
  
  private constructor() {
    // do something construct...
  }
  
  static getInstance() {
    if (!AEngine.instance) {
      AEngine.instance = new AEngine();
      // ... any one time initialization goes here ...
		}
		
    return AEngine.instance;
	}
	
	setScene(scene: AScene) {
    // TODO: Scene destroy
    this.currentScene = scene;
    this.currentScene.initScene(this._engine, this._canvas);
  }
  
  init(canvas: HTMLCanvasElement) {
    this._canvas = canvas;

		this._engine = new Engine(this._canvas, false, {
      
    });
		
		console.log(this._engine);
	}
	
	animate(): void {
    if (this.currentScene) {
      this.currentScene.getScene().registerBeforeRender(() => {
        let deltaTime: number = (1 / this._engine.getFps());
        
        this.currentScene.sceneBeforeRender(deltaTime);
      });
      
      // run the render loop
      this._engine.runRenderLoop(() => {
        this.currentScene.getScene().render();
      });
      
      // the canvas/window resize event handler
      window.addEventListener('resize', () => {
        this._engine.resize();
      });
    } else {
      console.error('No current scene');
    }
  }
}