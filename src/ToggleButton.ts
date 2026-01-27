import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class ToggleButton extends CanvasItem {
  private stateGliding: boolean = false;

  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
  }

  public setGliding(state: boolean): void {
    this.stateGliding = state;
  }

  public override getWidth(): number {
    return 100;
  }

  public override getHeight(): number {
    return 50;
  }

  /**
   * Override the render method as we don't have an image for the button
   * @param canvas canvas to render to
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillRectangle(
      canvas,
      this.posX,
      this.posY,
      100,
      50,
      this.stateGliding ? 'red' : 'blue');

    CanvasRenderer.drawRectangle(
      canvas,
      this.posX,
      this.posY,
      100,
      50,
      'black');

    CanvasRenderer.writeText(
      canvas,
      this.stateGliding ? 'Gliding' : 'Stepped',
      this.posX + 50,
      this.posY + 30,
      'center',
      'sans-serif',
      20,
      'white');
  }
}
