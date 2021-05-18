function fact(n) {
  return n > 1 ? n * fact(n - 1n) : 1n;
}

function fact2(n) {
  let r = 1n;
  for (let i = 1n; i <= n; i++) {
    if (n < 2n) {
      r++;
    } else {
      r *= i;
    }
  }
  return r;
}
const n = 10000n;
var timestamp1 = new Date();
const big_fact = fact(n);
var timestamp2 = new Date();
const bigger_fact = fact2(n);
var timestamp3 = new Date();
var recursive = parseInt(timestamp2.getTime()) - parseInt(timestamp1.getTime());
var iterative = parseInt(timestamp3.getTime()) - parseInt(timestamp2.getTime());
console.log(big_fact.toString());
console.log(bigger_fact.toString());
console.log(timestamp1.getTime());
console.log(timestamp2.getTime());
console.log(timestamp3.getTime());
console.log("Recursive: ");
console.log(recursive);
console.log("Iterative: ");
console.log(iterative);
