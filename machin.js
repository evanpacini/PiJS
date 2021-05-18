self.addEventListener("message", function (e) {
  let i = 1n;
  let x = 3n * 10n ** (BigInt(e.data) + 20n);
  let pi = x;
  while (x > 0) {
    x = (x * i) / ((i + 1n) * 4n);
    pi += x / (i + 2n);
    i += 2n;
  }
  pi /= 10n ** 20n;
  self.postMessage(pi.toString()[0] + "." + pi.toString().slice(1));
});
