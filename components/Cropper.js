import CircleFrame from "./CircleFrame.js";
import EventCoordinates from "./EventCoordinates.js";


//!!!!!!!!!!!cropper.eventCoordinates
export default class Cropper {
  constructor(blob, canvas) {
    this.indent = 20; //px
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.blobToImg(blob);

    window.addEventListener('resize', () => {
      this.setCoefficient();
      this.circleFrame.k = this.k;
    });

    let cropper = this;


    function handler(e) {
      let x = e.movementX;
      let y = e.movementY;
      console.log(cropper.eventCoordinates);
      if (cropper.eventCoordinates.isCenter) {
        cropper.circleFrame.x0 = cropper.circleFrame.x0 + x*cropper.k;
        cropper.circleFrame.y0 = cropper.circleFrame.y0 + y*cropper.k;
      } else if (this.eventCoordinates.isLeft) {

      } else if (this.eventCoordinates.isRight) {

      } else if (this.eventCoordinates.isTop) {

      } else if (this.eventCoordinates.isBottom) {

      }
      cropper.drawImage();
      cropper.drawCircleFrame();

    }

    this.canvas.addEventListener('mousemove', (e) => {
      let eventCoordinates = new EventCoordinates(e, cropper);
      if (eventCoordinates.isCenter) {
        this.canvas.style.cursor = 'move';
      } else if (eventCoordinates.isLeft || eventCoordinates.isRight || eventCoordinates.isTop || eventCoordinates.isBottom) {
        this.canvas.style.cursor = 'pointer';
      } else {
        this.canvas.style.cursor = 'auto';
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.eventCoordinates = new EventCoordinates(e, cropper);
      document.addEventListener('mousemove', handler);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handler);
    });

  }

  blobToImg(blob) {
    let img = new Image();
    img.src = URL.createObjectURL(blob);
    img.onload = () => {
      this.img = img;
      this.imgWidth = this.img.width;
      this.imgHeight = this.img.height;
      this.initCropper();
    };
  }

  initCropper() {
    this.drawImage();
    this.setCoefficient();
    this.circleFrame = new CircleFrame(this.imgWidth / 2, this.imgHeight / 2, Math.min(this.imgWidth, this.imgHeight) / 4, this.k);
    this.drawCircleFrame();
    console.log(this.circleFrame);
  }

  setCoefficient() {
    this.k = this.imgWidth / this.canvas.offsetWidth;
  }

  drawImage() {
    this.canvas.width = this.imgWidth;
    this.canvas.height = this.imgHeight;
    this.ctx.clearRect(0, 0, this.imgWidth, this.imgHeight);
    this.ctx.drawImage(this.img, 0, 0, this.imgWidth, this.imgHeight);
    this.ctx.save();
  }

  drawCircleFrame() {
    this.ctx.restore();
    this.ctx.beginPath();
    this.ctx.arc(this.circleFrame.x0, this.circleFrame.y0, this.circleFrame.radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 2 * this.k;
    this.ctx.stroke();
  }


}