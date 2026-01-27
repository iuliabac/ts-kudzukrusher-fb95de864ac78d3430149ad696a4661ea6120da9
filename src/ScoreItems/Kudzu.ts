import CanvasRenderer from '../CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Kudzu extends ScoreItem {
  private speedX: number;

  private speedY: number;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.image = CanvasRenderer.loadNewImage('./assets/kudzu.png');

    this.speedX = (Math.random() * 2 - 1) / 10;
    this.speedY = (Math.random() * 2 - 1) / 10;
    
    this.score = 5;
  }

  /**
   * Update the kudzu
   * @param elapsed elapsed ms since last update
   */
  public update(elapsed: number): void {
    this.posX += this.speedX * elapsed;
    this.posY += this.speedY * elapsed;

    if (this.posX < 0) {
      this.speedX *= -1;
    }

    if (this.posX + this.image.width > this.maxX) {
      this.speedX *= -1;
    }

    if (this.posY < 0) {
      this.speedY *= -1;
    }
    if (this.posY + this.image.height > this.maxY) {
      this.speedY *= -1;
    }
  }
}
