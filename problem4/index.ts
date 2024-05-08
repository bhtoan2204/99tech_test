function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
// Complexity: O(n) - Linear time complexity. 

function sum_to_n_b(n: number): number {
  return n * (n + 1) / 2;
}
// Complexity: O(1) - Constant time complexity. 

function sum_to_n_c(n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, curr) => acc + curr, 0);
}
// Complexity: O(n) - Linear time complexity.

const n = 9999999;

console.log(sum_to_n_a(n));
console.log(sum_to_n_b(n));
console.log(sum_to_n_c(n));