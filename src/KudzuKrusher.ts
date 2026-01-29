import Game from './Game.js';

import CanvasRenderer from './CanvasRenderer.js';
import Kudzu from './ScoreItems/Kudzu.js';
import Player from './Player.js';
import ScoreItem from './ScoreItems/ScoreItem.js';
import Flower from './ScoreItems/Flower.js';
import MouseListener from './MouseListener.js';

export default class KudzuKrusher extends Game {
  private canvas: HTMLCanvasElement;

  private mouseListener: MouseListener;

  private player: Player;

  private scoreItems: ScoreItem[] = [];

  private timeToNextItem: number;

  private score: number;

  private flowersLost: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerWidth;
    this.canvas.width = window.innerHeight;
    this.mouseListener = new MouseListener(this.canvas);
    this.canvas.style.cursor = 'none';

    this.player = new Player(this.canvas.height, this.canvas.width);

    this.timeToNextItem = 500;

    this.score = 0;

    this.flowersLost = 0;

    for (let i: number = 0; i < 100; i++) {
      this.scoreItems.push(new Flower(this.canvas.height, this.canvas.width));
    }
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    const dirX: number = this.mouseListener.getMousePosition().x;
    const dirY: number = this.mouseListener.getMousePosition().y;

    this.player.move(dirX, dirY);

    if (this.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      for (let i: number = this.scoreItems.length - 1; i >= 0; i--) {
        const item: ScoreItem = this.scoreItems[i];

        if (this.player.isCollidingWithItem(item)) {
          if (item instanceof Flower) {
            this.flowersLost += 1;
          }

          this.score += item.getScore();
          this.scoreItems.splice(i, 1);
        }
      }
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param delta time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(delta: number): boolean {
    this.timeToNextItem -= delta;

    if (this.timeToNextItem < 0) {
      const random: number = Math.random();

      if (random > 0.85) {
        this.scoreItems.push(new Kudzu(this.canvas.width, this.canvas.height));
      } else {
        this.scoreItems.push(new Flower(this.canvas.width, this.canvas.height));
      }

      this.timeToNextItem = 250;
    }

    for (const item of this.scoreItems) {
      item.update(delta);
    }

    for (let i: number = this.scoreItems.length - 1; i >= 0; i--) {
      const item: ScoreItem = this.scoreItems[i];

      if (item instanceof Kudzu) {
        for (let j: number = this.scoreItems.length - 1; j >= 0; j--) {
          const item2: ScoreItem = this.scoreItems[j];

          if (item2 instanceof Flower && item.isCollidingWithItem(item2)) {
            this.flowersLost += 1;
            this.scoreItems.splice(j, 1);
          }
        }
      }
    }
    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);

    this.player.render(this.canvas);
    this.scoreItems.forEach((item: ScoreItem) => item.render(this.canvas));

    CanvasRenderer.writeText(this.canvas, `Score ${this.score}`, 40, 50, 'left', 'sans-serif', 30, '#040');
    CanvasRenderer.writeText(this.canvas, `Flowers Lost ${this.flowersLost}`, 40, 80, 'left', 'sans-serif', 26, '#040');
  }
}
