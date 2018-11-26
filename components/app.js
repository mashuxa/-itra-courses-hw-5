import Cropper from "./Cropper.js";

(function () {
  let inputFile = document.forms.formUploadAvatar.inputUploadAvatar;
  let canvas = document.getElementById('canvas');
  let btnApply = document.getElementById('btnApply');
  let avatar = document.getElementById('avatar');

  inputFile.addEventListener('change', (e) => {
    let blob = e.target.files[0];
    blob ? new Cropper(blob, canvas, btnApply, avatar) : false;
    btnApply.classList.remove('btn--disabled');
  });

})();