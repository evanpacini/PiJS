/*
 * PI computation in Javascript using the BigInt type
 */
"use strict";

function floor_log2(a) {
  var k_max, a1, k, i;
  k_max = 0n;
  while (a >> (2n ** k_max) != 0n) {
    k_max++;
  }
  k = 0n;
  a1 = a;
  for (i = k_max - 1n; i >= 0n; i--) {
    a1 = a >> (2n ** i);
    if (a1 != 0n) {
      a = a1;
      k |= 1n << i;
    }
  }
  return k;
}

function ceil_log2(a) {
  return floor_log2(a - 1n) + 1n;
}

function int_sqrt(a) {
  var l, u, s;
  if (a == 0n) return a;
  l = ceil_log2(a);
  u = 1n << ((l + 1n) / 2n); // Overestimation of sqrt(a)
  //Babylonian method
  for (;;) {
    s = u;
    u = (a / s + s) / 2n;
    if (u >= s) break; // We reach peak precision when the new value exceeds or equals the last overestimation
  }
  return s;
}

function pi(end) {
  const DP = BigInt(1e5) + 32n; // Decimal precision
  const A = 13591409n;
  const B = 545140134n;
  const C3_OVER_24 = 10939058860032000n; // C ** 3 / 24;
  let k = 1n;
  let a_k = 10n ** DP;
  let a_sum = 10n ** DP;
  let b_sum = 0n;
  for (;;) {
    a_k *= -(6n * k - 5n) * (2n * k - 1n) * (6n * k - 1n);
    a_k /= k * k * k * C3_OVER_24;
    a_sum += a_k;
    b_sum += k * a_k;
    k += 1n;
    if (k >= end) break;
  }
  console.log("k: " + k.toString());
  const DENOM = 426880n * int_sqrt(10005n * 10n ** (DP * 2n));
  const total = A * a_sum + B * b_sum;
  const pi = (DENOM * 10n ** DP) / total;
  return pi;
}
self.addEventListener("message", function (e) {
  const pi_val = pi(10000n);
  const pi_str = pi_val.toString()[0] + "." + pi_val.toString().slice(1, pi_val.toString().length - 32);
  self.postMessage(pi_str);
});
