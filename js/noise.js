import { createXORShift32 } from "./xorshift32.js";

export function createPerlinNoise1D(size, seed) {
  const randomValues = createRandomValues(size, seed);
  function rand(x) {
    return randomValues[x % randomValues.length];
  }
  function grad(i) {
    return Math.sign(rand(i));
  }
  return function(x) {
    const i = Math.floor(x);
    const i_ = i + 1;
    const gi = grad(i);
    const gi_ = grad(i_);
    const a0 = gi * (x - i);
    const a1 = gi_ * (x - i_);
    const u = fade(x - i);
    return lerp(u, a0, a1);
  };
}

const centerToEdge2D = Object.freeze([
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 }
]);
export function createPerlinNoise2D(size, seed) {
  const randomValues = createRandomValues(size, seed);
  function rand(x, y) {
    const randX = randomValues[x % randomValues.length];
    return randomValues[Math.abs(randX + y) % randomValues.length];
  }
  function grad(i, j) {
    return centerToEdge2D[Math.abs(rand(i, j)) % centerToEdge2D.length];
  }
  return function(x, y) {
    const i = Math.floor(x);
    const i_ = i + 1;
    const j = Math.floor(y);
    const j_ = j + 1;
    const g00 = grad(i, j);
    const g01 = grad(i, j_);
    const g10 = grad(i_, j);
    const g11 = grad(i_, j_);
    const a00 = g00.x * (x - i) + g00.y * (y - j);
    const a01 = g01.x * (x - i) + g01.y * (y - j_);
    const a10 = g10.x * (x - i_) + g10.y * (y - j);
    const a11 = g11.x * (x - i_) + g11.y * (y - j_);
    const u = fade(x - i);
    const v = fade(y - j);
    return lerp(v, lerp(u, a00, a10), lerp(u, a01, a11));
  };
}

function createRandomValues(size, seed) {
  const rng = createXORShift32(seed);
  const rand = new Array(size);
  for (let i = 0; i < rand.length; i++) {
    rand[i] = rng();
  }
  return rand;
}

function lerp(t, x, y) {
  return x + t * (y - x);
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
