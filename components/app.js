import Cropper from "./Cropper.js";

(function () {
  let inputFile = document.forms.formUploadAvatar.inputUploadAvatar;
  let canvas = document.getElementById('canvas');

  inputFile.addEventListener('change', (e) => {
    let blob = e.target.files[0];
    let cropper = blob ? new Cropper(blob, canvas) : false;
    if (cropper) {














    }

  });

})();