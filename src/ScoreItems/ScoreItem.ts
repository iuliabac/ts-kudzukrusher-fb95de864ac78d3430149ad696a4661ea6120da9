import CanvasItem from '../CanvasItem.js';

export default abstract class ScoreItem extends CanvasItem {
  protected score: number;

  protected maxX: number;

  protected maxY: number;

  public constructor(maxX: number, maxY: number) {
    super();
    
    this.maxX = maxX;
    this.maxY = maxY;

    this.posX = Math.random() * maxX;
    this.posY = Math.random() * maxY;

    this.score = 0;
  }

  public getScore(): number {
    return this.score;
  }

  public abstract update(elapsed: number): void;
}
