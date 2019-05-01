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
    const y = (noise(i * 0.1) + 0.5) * 150;
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
      const a = noise(x * scale, y * scale) + 0.5;
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
    const scale1 = 0.01;
    const scale2 = 0.03;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const i = x + y * canvas.width;
        const n1 = noise(x * scale1, y * scale1 + t * 0.0005, t * 0.0001) + 0.5;
        const n2 = noise(x * scale2, y * scale2, t * 0.00001) * 0.1 + 0.6;
        const a = n1 * n2;
        imageData.data[i * 4 + 3] = a * 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    window.requestAnimationFrame(render);
  }
  window.requestAnimationFrame(render);
}
