import { createXORShift32 } from "./xorshift32.js";

export function createPerlinNoise1D(seed) {
  const randomValues = createRandomValues(seed);
  function rand(x) {
    return randomValues[x % randomValues.length];
  }
  function grad(i) {
    return [1, -1][rand(i) % 2];
  }
  return function(x) {
    const i = Math.trunc(x);
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
export function createPerlinNoise2D(seed) {
  const randomValues = createRandomValues(seed);
  function rand(x, y) {
    const randX = randomValues[x % randomValues.length];
    return randomValues[(randX + y) % randomValues.length];
  }
  function grad(i, j) {
    return centerToEdge2D[rand(i, j) % centerToEdge2D.length];
  }
  return function(x, y) {
    const i = Math.trunc(x);
    const i_ = i + 1;
    const j = Math.trunc(y);
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

const centerToEdge3D = Object.freeze([
  { x: 1, y: 1, z: 0 },
  { x: -1, y: 1, z: 0 },
  { x: 1, y: -1, z: 0 },
  { x: -1, y: -1, z: 0 },
  { x: 1, y: 0, z: 1 },
  { x: -1, y: 0, z: 1 },
  { x: 1, y: 0, z: -1 },
  { x: -1, y: 0, z: -1 },
  { x: 0, y: 1, z: 1 },
  { x: 0, y: -1, z: 1 },
  { x: 0, y: 1, z: -1 },
  { x: 0, y: -1, z: -1 }
]);
export function createPerlinNoise3D(seed) {
  const randomValues = createRandomValues(seed);
  function rand(x, y, z) {
    const randX = randomValues[x % randomValues.length];
    const randY = randomValues[(randX + y) % randomValues.length];
    return randomValues[(randY + z) % randomValues.length];
  }
  function grad(i, j, k) {
    return centerToEdge3D[rand(i, j, k) % centerToEdge3D.length];
  }
  return function(x, y, z) {
    const i = Math.trunc(x);
    const i_ = i + 1;
    const j = Math.trunc(y);
    const j_ = j + 1;
    const k = Math.trunc(z);
    const k_ = k + 1;
    const g000 = grad(i, j, k);
    const g001 = grad(i, j, k_);
    const g010 = grad(i, j_, k);
    const g011 = grad(i, j_, k_);
    const g100 = grad(i_, j, k);
    const g101 = grad(i_, j, k_);
    const g110 = grad(i_, j_, k);
    const g111 = grad(i_, j_, k_);
    const a000 = g000.x * (x - i) + g000.y * (y - j) + g000.z * (z - k);
    const a001 = g001.x * (x - i) + g001.y * (y - j) + g001.z * (z - k_);
    const a010 = g010.x * (x - i) + g010.y * (y - j_) + g010.z * (z - k);
    const a011 = g011.x * (x - i) + g011.y * (y - j_) + g011.z * (z - k_);
    const a100 = g100.x * (x - i_) + g100.y * (y - j) + g100.z * (z - k);
    const a101 = g101.x * (x - i_) + g101.y * (y - j) + g101.z * (z - k_);
    const a110 = g110.x * (x - i_) + g110.y * (y - j_) + g110.z * (z - k);
    const a111 = g111.x * (x - i_) + g111.y * (y - j_) + g111.z * (z - k_);
    const u = fade(x - i);
    const v = fade(y - j);
    const w = fade(z - k);
    return lerp(
      w,
      lerp(v, lerp(u, a000, a100), lerp(u, a010, a110)),
      lerp(v, lerp(u, a001, a101), lerp(u, a011, a111))
    );
  };
}

function createRandomValues(seed) {
  const rng = createXORShift32(seed);
  const rand = new Array(256);
  for (let i = 0; i < rand.length; i++) {
    rand[i] = Math.abs(rng());
  }
  return rand;
}

function lerp(t, x, y) {
  return x + t * (y - x);
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
