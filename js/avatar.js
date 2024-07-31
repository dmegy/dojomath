// - - - - GESTION DE L'UPLOAD D'AVATAR - - - - - -

// PROBLEMES !! la fonction displayAvatarImage marche : si on fixe user.avatarURL puis qu'on la lance, ça affiche l'image.
// par contre le listener ne semble pas être ajouté
// régler ça...

// retourne une promesse d'image avec une url loadée dedans
const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = url;
  });

// prend un type file (récupéré dans un 'input file') et le met dans un filereader
// retourne une promesse de dataURL de ceci
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    let fileredr = new FileReader();
    fileredr.onload = () => resolve(fileredr.result);
    fileredr.onerror = () => reject(fileredr);
    fileredr.readAsDataURL(file);
  });
}

// le input pour l'upload de photos de profil
const uploadFile = document.getElementById("inputTag");

window.addEventListener("load", () => {
  console.log(uploadFile);

  uploadFile.addEventListener(
    "change",
    async (evt) => {
      console.log("image changée");
      let imageSize = 96; // taille de l'image carrée, après recadrage et redimension
      let file = evt.currentTarget.files[0];
      if (!file) return;
      let b64str = await readFileAsDataURL(file);
      let _IMG = await loadImage(b64str);

      const inputWidth = _IMG.naturalWidth;
      const inputHeight = _IMG.naturalHeight;
      // centering :
      const smallestSize = Math.min(inputWidth, inputHeight);
      const startX = (inputWidth - smallestSize) / 2;
      const startY = (inputHeight - smallestSize) / 2;
      let canvas = document.createElement("canvas");
      canvas.width = imageSize;
      canvas.height = imageSize;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(
        _IMG,
        startX,
        startY,
        smallestSize,
        smallestSize,
        0,
        0,
        imageSize,
        imageSize
      );
      // compression puis création de la dataURL, enregistrement dans user.
      user.avatarURL = canvas.toDataURL("image/jpeg", 0.8);

      displayAvatarImage();

      // todo :  save() /* save in storage */
    },
    false
  ); // endEventListener image upload
  console.log("listener added"); //est affiché mais le listener ne semble pas être ajouté ?
});

function displayAvatarImage() {
  // ceci marche.
  //enlever icone image manquante :
  document.getElementById("beforeAvatar").style.display = "none";
  // on enlève le cercle en pointillés puis on affiche l'image :
  document.getElementById("avatarDisk").classList.remove("avatar-missing");
  let avatarImg = document.getElementById("avatarImg");
  avatarImg.src = user.avatarURL;
  avatarImg.style.display = "";
}
