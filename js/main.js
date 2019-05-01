import { createPerlinNoise1D, createPerlinNoise2D } from "./noise.js";

{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const noise = createPerlinNoise1D(10);

  document.body.appendChild(canvas);

  ctx.beginPath();
  for (let i = 0; i < canvas.width; i++) {
    const y = ((noise(i * 0.1) + 1) / 2) * 150;
    ctx.lineTo(i, y);
  }
  ctx.stroke();
}

{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const noise = createPerlinNoise2D(100);

  document.body.appendChild(canvas);

  const scale = 0.1;
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const a = (noise(x * scale, y * scale) + 1) / 2;
      ctx.fillStyle = `rgba(0, 0, 0, ${a})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}
