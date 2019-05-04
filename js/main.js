import {
  createPerlinNoise1D,
  createPerlinNoise2D,
  createPerlinNoise3D
} from "./noise.js";

{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const noise = createPerlinNoise1D();

  document.body.appendChild(canvas);

  ctx.beginPath();
  for (let i = 0; i < canvas.width; i++) {
    const y = (noise(i * 0.1) + 0.5) * 150;
    ctx.lineTo(i, y);
  }
  ctx.stroke();
}

{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const noise = createPerlinNoise2D();

  document.body.appendChild(canvas);

  const scale = 25;
  const octaves = 4;
  const persistence = 1 / 2;
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      let a = 0;
      for (let octave = 0; octave < octaves; octave++) {
        const frequency = Math.pow(2, octave);
        const amplitude = Math.pow(persistence, octave);
        const x_ = (x * frequency) / scale;
        const y_ = (y * frequency) / scale;
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
  const noise = createPerlinNoise3D();

  document.body.appendChild(canvas);

  const scale1 = 0.01;
  const scale2 = 0.03;
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const i = x + y * canvas.width;
      const n1 = noise(x * scale1, y * scale1, 0) + 0.5;
      const n2 = noise(x * scale2, y * scale2, 0) * 0.1 + 0.6;
      const a = n1 * n2;
      imageData.data[i * 4 + 3] = a * 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
