import CanvasRenderer from './CanvasRenderer.js';
import CanvasItem from './CanvasItem.js';

export default class Player extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();
    this.posX = maxX / 2;
    this.posY = maxY / 2;

    this.image = CanvasRenderer.loadNewImage('./assets/hoe_wood.png');
  }

  /**
   * Get the new position of the player from the mouse position
   *
   * @param posX x-coordinate of the player
   * @param posY y-coordinate of the player
   */
  public move(posX: number, posY: number): void {
    this.posX = posX;
    this.posY = posY;
  }
}
