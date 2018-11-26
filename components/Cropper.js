import CircleFrame from "./CircleFrame.js";
import EventCoordinates from "./EventCoordinates.js";



export default class Cropper {
  constructor(blob, canvas, btnApply, avatar) {
    this.indent = 20; //px
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.blobToImg(blob);
    this.btnApply = btnApply;
    this.avatar = avatar;



    let cropper = this;
    function handler(e) {
      let x = e.movementX;
      let y = e.movementY;
      if (cropper.eventCoordinates.isCenter) {
        cropper.circleFrame = new CircleFrame(cropper.circleFrame.x0 + x*cropper.k,cropper.circleFrame.y0 + y*cropper.k, cropper.circleFrame.radius ,cropper.k);
      } else if (cropper.eventCoordinates.isLeft) {
        cropper.circleFrame = new CircleFrame(cropper.circleFrame.x0, cropper.circleFrame.y0, cropper.circleFrame.radius - x * cropper.k, cropper.k);
      } else if (cropper.eventCoordinates.isRight) {
        cropper.circleFrame = new CircleFrame(cropper.circleFrame.x0, cropper.circleFrame.y0, cropper.circleFrame.radius + x * cropper.k, cropper.k);
      } else if (cropper.eventCoordinates.isTop) {
        cropper.circleFrame = new CircleFrame(cropper.circleFrame.x0, cropper.circleFrame.y0, cropper.circleFrame.radius - y * cropper.k, cropper.k);
      } else if (cropper.eventCoordinates.isBottom) {
        cropper.circleFrame = new CircleFrame(cropper.circleFrame.x0, cropper.circleFrame.y0, cropper.circleFrame.radius + y * cropper.k, cropper.k);
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
    window.addEventListener('resize', () => {
      this.setCoefficient();
      this.circleFrame.k = this.k;
    });
    this.btnApply.addEventListener('click', (e)=>{
      this.applyImg();
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

  applyImg(){
    console.log(this.circleFrame);
    this.drawImage();
    this.canvas.width = this.circleFrame.radius * 2;
    this.canvas.height = this.circleFrame.radius * 2;
    this.ctx.drawImage(this.img, this.circleFrame.x0 - this.circleFrame.radius, this.circleFrame.y0 - this.circleFrame.radius, this.circleFrame.radius * 2, this.circleFrame.radius*2, 0, 0, this.circleFrame.radius*2, this.circleFrame.radius*2);

    let newImg = new Image(100, 100);
    newImg.src = this.canvas.toDataURL();
    newImg.onload = ()=>{
      this.img = newImg;
      this.avatar.src = newImg.src;
      this.initCropper();
    };

  }

}