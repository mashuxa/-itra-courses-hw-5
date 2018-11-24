export default class Cropper {
  constructor(blob, wrapper) {
    let img = new Image();
    img.src = URL.createObjectURL(blob);
    img.onload = () => {
      let imgWidth = img.width;
      let imgHeight = img.height;
      wrapper.innerHTML = '';
      let canvas = document.createElement('canvas');
      wrapper.appendChild(canvas);
      canvas.id = 'canvas';
      canvas.className = 'canvas';
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

      let borders = document.createElement('div');
      borders.id = 'borders';
      borders.className = 'borders';
      wrapper.appendChild(borders);


      this.ctx = ctx;
    };
  }


}