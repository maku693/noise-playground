import {
  createPerlinNoise1D,
  createPerlinNoise2D,
  createPerlinNoise3D
} from "./noise.js";

{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const noise = createPerlinNoise1D(30, 10);

  document.body.appendChild(canvas);

  ctx.beginPath();
  for (let i = 0; i < canvas.width; i++) {
    const y = noise(i) * 100 + 75;
    ctx.lineTo(i, y);
  }
  ctx.stroke();
}

{
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const noise = createPerlinNoise2D(32, 8);

  document.body.appendChild(canvas);

  const octaves = 4;
  const persistence = 1 / 2;
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      let a = 0;
      for (let octave = 0; octave < octaves; octave++) {
        const frequency = Math.pow(2, octave);
        const amplitude = Math.pow(persistence, octave);
        const x_ = x * frequency;
        const y_ = y * frequency;
        a += noise(x_, y_) * amplitude;
      }
      a = a / octaves + 0.5;
      ctx.fillStyle = `rgba(0, 0, 0, ${a})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const noise = createPerlinNoise3D(30, 10);

  document.body.appendChild(canvas);

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const i = (x + y * canvas.width) * 4 + 3;
      const a = noise(x, y, 0) * 0.5 + 0.5;
      imageData.data[i] = a * 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
