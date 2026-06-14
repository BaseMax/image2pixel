const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

const outBase64 = document.getElementById("outBase64");
const outPixels = document.getElementById("outPixels");
const outPixelsB64 = document.getElementById("outPixelsB64");
const outCSV = document.getElementById("outCSV");
const outCSVb64 = document.getElementById("outCSVb64");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function isValidImage(file) {
  return file && file.type && file.type.startsWith("image/");
}

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function uint8ToBase64(uint8) {
  let binary = "";
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  return btoa(binary);
}

function processImage(file) {
  if (!isValidImage(file)) {
    alert("Invalid file: not an image");
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();

    img.onload = () => {
      preview.src = e.target.result;
      preview.classList.remove("hidden");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const pixels = imageData.data;

      outBase64.value = e.target.result;

      const pixelArray = Array.from(pixels);
      outPixels.value = JSON.stringify(pixelArray);

      outPixelsB64.value = uint8ToBase64(pixels);

      const csv = pixelArray.join(", ");
      outCSV.value = csv;

      outCSVb64.value = btoa(csv);
    };

    img.onerror = () => {
      alert("Failed to load image");
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

dropzone.addEventListener("click", () => fileInput.click());

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("border-blue-400");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("border-blue-400");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("border-blue-400");

  const file = e.dataTransfer.files[0];
  processImage(file);
});

fileInput.addEventListener("change", (e) => {
  processImage(e.target.files[0]);
});
