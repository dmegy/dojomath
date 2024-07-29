// - - - - GESTION DE L'UPLOAD D'AVATAR - - - - - -

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
