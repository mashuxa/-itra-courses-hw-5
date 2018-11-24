import Cropper from "./Cropper.js";

(function () {
  let inputFile = document.forms.formUploadAvatar.inputUploadAvatar;
  let wrapper = document.querySelector('.canvas__wrapper');
  inputFile.addEventListener('change', (e) => {
    let cropper = new Cropper(e.target.files[0], wrapper);
    console.log(cropper);
  });

})();