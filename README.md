# 📸 image2pixel

A web-based image processing platform that converts images into multiple pixel-level representations including raw buffers, CSV formats, and Base64 encodings.

> Built with Node.js, Canvas API, and TailwindCSS (no external CSS files required).

---

## 🚀 Features

Upload or drag-and-drop an image and instantly generate:

1. 🖼️ **Base64 of original image**
2. 🧮 **Raw pixel buffer array (RGBA Uint8 data)**
3. 🔐 **Base64 encoded pixel buffer**
4. 📊 **CSV representation of pixel values**
5. 🔐 **Base64 encoded CSV string**

---

## 🧠 Data Model

This project focuses on low-level pixel representation pipelines:

* **pixels → Uint8 RGBA array**
* **pixels → Base64(raw binary buffer)**
* **pixelsText → CSV (comma-separated integers)**
* **pixelsTextB64 → Base64(CSV string)**

### Conceptual Flow

```
Image
  ↓
Canvas (ImageData)
  ↓
Uint8ClampedArray (RGBA pixels)
  ↓
┌───────────────────────────────┐
│ 1. Raw pixel buffer           │
│ 2. Base64(pixel buffer)       │
│ 3. CSV string                 │
│ 4. Base64(CSV string)         │
└───────────────────────────────┘
```

---

## 🖥️ UI Overview

* Drag & drop support
* Click-to-upload fallback
* Live image preview
* Multi-panel output dashboard
* Dark-themed UI using TailwindCSS

---

## 📦 Installation

```bash
git clone https://github.com/BaseMax/image2pixel.git
cd image2pixel
npm install
```

---

## ▶️ Run

```bash
npm start
```

Then open:

```
http://localhost:3000
```

---

## 🧱 Tech Stack

* Node.js (Express)
* Vanilla JavaScript
* HTML5 Canvas API
* TailwindCSS (CDN)
* FileReader API

---

## ⚙️ How It Works

The image is processed entirely in-browser using the Canvas API:

1. Image is loaded via `FileReader`
2. Drawn into an off-screen `<canvas>`
3. Extracted via:

   ```js
   getImageData(x, y, width, height)
   ```
4. Pixel data is accessed as:

   ```js
   Uint8ClampedArray [R, G, B, A, ...]
   ```

### Encoding Layers

| Layer         | Description                    |
| ------------- | ------------------------------ |
| Raw pixels    | Uint8 RGBA buffer              |
| Base64 buffer | Binary encoding of pixel array |
| CSV           | Human-readable pixel values    |
| Base64 CSV    | Encoded text form              |

---

## 🧪 Example Output

### Pixel buffer

```
[255, 0, 0, 255, 10, 20, 30, 255, ...]
```

### CSV

```
255, 0, 0, 255, 10, 20, 30, 255, ...
```

### Base64(pixel buffer)

```
AP8A...
```

---

## 📌 Use Cases

* Image-to-data conversion research
* Computer vision preprocessing experiments
* Educational pixel-level visualization
* Data compression experiments
* Custom ML dataset generation

---

## ⚠️ Notes

* Large images may generate very large outputs
* CSV/Base64 outputs can become extremely heavy
* Processing is client-side (no server image storage)

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

You are free to:

* Use
* Modify
* Distribute

under the terms of the GPL-3.0 license.

See: [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)

---

## 👨‍💻 Author

**Seyyed Ali Mohammadiyeh (MAX BASE)**

---

## ⭐ Future Ideas

* Pixel-level histogram visualization
* Grayscale / threshold filters
* Tensor export (NumPy / PyTorch format)
* WebGPU acceleration
* Image streaming & chunk processing
* Real-time pixel manipulation editor
