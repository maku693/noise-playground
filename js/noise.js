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
