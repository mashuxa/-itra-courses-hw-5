export default class CircleFrame {
  constructor(x0, y0, radius, k) {

    this.x0 = x0;
    this.y0 = y0;
    this.radius = radius;
    this.x1 = (this.x0 - this.radius) / k;
    this.x2 = (this.x0 + this.radius) / k;
    this.y1 = (this.y0 - this.radius) / k;
    this.y2 = (this.y0 + this.radius) / k;
    this.xc = x0 / k;
    this.yc = y0 / k;


  }


}