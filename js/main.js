import { createPerlinNoise1D } from "./noise.js";

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
