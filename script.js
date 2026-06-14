const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

const channelMode = document.getElementById("channelMode");

const outBase64 = document.getElementById("outBase64");
const outPixels = document.getElementById("outPixels");
const outPixelsB64 = document.getElementById("outPixelsB64");
const outCSV = document.getElementById("outCSV");
const outCSVb64 = document.getElementById("outCSVb64");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let lastFile = null;

function isValidImage(file) {
  return file && file.type && file.type.startsWith("image/");
}

function uint8ToBase64(uint8) {
  let binary = "";
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  return btoa(binary);
}

function projectPixels(data, mode) {
  const out = [];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (mode === "rgb") {
      out.push(r, g, b);
    } else if (mode === "r") {
      out.push(r);
    } else if (mode === "g") {
      out.push(g);
    } else if (mode === "b") {
      out.push(b);
    } else if (mode === "a") {
      out.push(a);
    } else {
      out.push(r, g, b, a);
    }
  }

  return out;
}

function processImage(file) {
  if (!isValidImage(file)) {
    alert("Invalid file: not an image");
    return;
  }

  lastFile = file;

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

      // 1. base64 image (unchanged)
      outBase64.value = e.target.result;

      // channel mode
      const mode = channelMode.value;

      // 2. pixel buffer (filtered)
      const pixelArray = projectPixels(pixels, mode);
      outPixels.value = JSON.stringify(pixelArray);

      // 3. base64 pixel buffer
      const pixelBytes = new Uint8Array(pixelArray);
      outPixelsB64.value = uint8ToBase64(pixelBytes);

      // 4. CSV
      const csv = pixelArray.join(", ");
      outCSV.value = csv;

      // 5. base64 CSV
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

channelMode.addEventListener("change", () => {
  if (lastFile) processImage(lastFile);
});
