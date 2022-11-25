/**
 * Helper function to calculate factorial based on input
 */
 export function factorialCalculator(num: number): number {
  var resultado = 1;
  for (let i = 1; i <= num; i++) { resultado *= i; }
  return resultado;
}
