/*
 * PI computation in Javascript using the BigInt type
 */
"use strict";
const DP = 10n ** BigInt(1e5) + 64n; // Decimal precision

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

function fact(n) {
  return n > 1 ? n * fact(n - 1n) : 1n;
}

function pi(start, end) {
  const A = 13591409n;
  const B = 545140134n;
  const C3 = 262537412640768000n; // C ** 3
  let a_sum = 0n;
  let b_sum = 0n;
  let k = start;
  for (;;) {
    let a_k = DP;
    a_k *= (-1n) ** k * fact(6n * k);
    a_k /= fact(3n * k) * fact(k) ** 3n * C3 ** k;
    a_sum += a_k;
    b_sum += k * a_k;
    k += 1n;
    if (k > end) break;
  }
  return A * a_sum + B * b_sum;
}
self.addEventListener("message", function (e) {
  const DENOM = 426880n * int_sqrt(10005n * DP ** 2n);
  const sum = pi(BigInt(e.data[0]), BigInt(e.data[1]));
  var pi_val = (DENOM * DP) / sum;
  var pi_str = pi_val.toString()[0] + "." + pi_val.toString().slice(1, 1e5 + 1);
  self.postMessage(pi_str);
});
