import {
  createPerlinNoise1D,
  createPerlinNoise2D,
  createPerlinNoise3D
} from "./noise.js";

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

{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const noise = createPerlinNoise3D(100);

  document.body.appendChild(canvas);

  function render(t) {
    const scale = 0.01;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const i = x + y * canvas.width;
        const a = (noise(x * scale, y * scale, t * 0.001) + 1) / 2;
        imageData.data[i * 4 + 3] = a * 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    window.requestAnimationFrame(render);
  }
  window.requestAnimationFrame(render);
}
