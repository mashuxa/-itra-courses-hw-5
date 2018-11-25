export default class EventCoordinates {
  constructor(e, cropper){
    this.x = e.offsetX;
    this.y = e.offsetY;
    this.isCenter = (this.x > cropper.circleFrame.x1 + cropper.indent && this.x < cropper.circleFrame.x2 - cropper.indent && this.y > cropper.circleFrame.y1 + cropper.indent && this.y < cropper.circleFrame.y2 - cropper.indent);
    this.isLeft = (this.x > cropper.circleFrame.x1 - cropper.indent && this.x < cropper.circleFrame.x1 + cropper.indent && this.y > cropper.circleFrame.yc - cropper.indent && this.y < cropper.circleFrame.yc + cropper.indent);
    this.isRight = (this.x > cropper.circleFrame.x2 - cropper.indent && this.x < cropper.circleFrame.x2 + cropper.indent && this.y > cropper.circleFrame.yc - cropper.indent && this.y < cropper.circleFrame.yc + cropper.indent);
    this.isTop = (this.x > cropper.circleFrame.xc - cropper.indent && this.x < cropper.circleFrame.xc + cropper.indent && this.y > cropper.circleFrame.y1 - cropper.indent && this.y < cropper.circleFrame.y1 + cropper.indent);
    this.isBottom = (this.x > cropper.circleFrame.xc - cropper.indent && this.x < cropper.circleFrame.xc + cropper.indent && this.y > cropper.circleFrame.y2 - cropper.indent && this.y < cropper.circleFrame.y2 + cropper.indent);
  }
}