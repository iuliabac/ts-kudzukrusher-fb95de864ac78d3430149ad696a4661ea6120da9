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
    const maxX: number = window.innerWidth;
    const maxY: number = window.innerHeight;

    this.canvas.height = maxY;
    this.canvas.width = maxX;
    this.mouseListener = new MouseListener(this.canvas);

    this.player = new Player(maxX, maxY);
    this.timeToNextItem = 500;
    this.score = 0;
    this.flowersLost = 0;

    for (let i: number = 0; i < 100; i++) {
      this.scoreItems.push(new Flower(maxX, maxY));
    }
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    this.player.move(this.mouseListener.getMousePosition().x, this.mouseListener.getMousePosition().y);

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
      this.score = Math.round(this.score);
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
      if (Math.random() > 0.85) {
        this.scoreItems.push(new Kudzu(this.canvas.width, this.canvas.height));
      } else {
        this.scoreItems.push(new Flower(this.canvas.width, this.canvas.height));
      }
      this.timeToNextItem = 250;
    }

    this.scoreItems = this.scoreItems.sort(
      (a: ScoreItem, b: ScoreItem) => a.getPosY() - b.getPosY(),
    );

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

    for (const item of this.scoreItems) {
      item.render(this.canvas);
    }
    CanvasRenderer.writeText(this.canvas, `Score ${this.score}`, 40, 50, 'left', 'sans-serif', 30, '#040');
    CanvasRenderer.writeText(this.canvas, `Flowers Lost ${this.flowersLost}`, 40, 80, 'left', 'sans-serif', 26, '#040');
    this.player.render(this.canvas);
  }
}
