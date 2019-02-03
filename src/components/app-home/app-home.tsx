import { Component } from '@stencil/core';

import { AEngine } from '../../global/engine/engine';
import { SceneTest } from '../../global/game/scenes/test';

@Component({
  tag: 'app-home'
})
export class AppHome {
  private game: AEngine;
  private canvas: HTMLCanvasElement;

  componentDidLoad() {
    this.game = AEngine.getInstance();

    this.game.init(this.canvas);

    this.game.animate();

    let scene = new SceneTest();

    this.game.setScene(scene);

    this.game.animate();
  }

  render() {
    return (
      <div class='app-home'>
        <canvas id="renderCanvas" ref={ (el) => { this.canvas = el } }></canvas>
      </div>
    );
  }
}
