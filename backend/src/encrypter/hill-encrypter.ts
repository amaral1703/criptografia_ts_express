// Função auxiliar para transformar texto em números (A=0, B=1, ..., Z=25)
function textToNumbers(text: string): number[] {
  return text.toUpperCase().replace(/[^A-Z]/g, '').split('').map(c => c.charCodeAt(0) - 65);
}

// Função auxiliar para transformar números em texto
function numbersToText(numbers: number[]): string {
  return numbers.map(n => String.fromCharCode((n % 26) + 65)).join('');
}

// Função auxiliar para módulo sempre positivo
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

// Corrigir a multiplicação da matriz
function multiplyMatrix2x2(vec: number[], mat: number[][]): number[] {
  return [
    mod(mat[0][0] * vec[0] + mat[0][1] * vec[1], 26),
    mod(mat[1][0] * vec[0] + mat[1][1] * vec[1], 26)
  ];
}

// Função para calcular o inverso modular de um número mod 26
function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error('Sem inverso modular');
}

// Corrigir o cálculo do determinante
function inverseMatrix2x2(mat: number[][]): number[][] {
  // Garantir que o determinante seja positivo
  const det = mod(mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0], 26);
  const detInv = modInverse(det, 26);
  
  return [
    [mod(mat[1][1] * detInv, 26), mod(-mat[0][1] * detInv, 26)],
    [mod(-mat[1][0] * detInv, 26), mod(mat[0][0] * detInv, 26)]
  ];
}

// Gera matriz 2x2 a partir da chave (precisa de 4 letras)
function keyToMatrix(key: string): number[][] {
  const nums = textToNumbers(key.padEnd(4, 'X').slice(0, 4));
  return [
    [nums[0], nums[1]],
    [nums[2], nums[3]]
  ];
}

function isMatrixInvertible(mat: number[][]): boolean {
  const det = mod(mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0], 26);
  // Verificar se det e 26 são coprimos
  return gcd(det, 26) === 1;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function HillEncrypt(plainText: string, key: string): { encryptedNumbers: string, encryptedText: string } {
  const matrix = keyToMatrix(key);
  let numbers = textToNumbers(plainText);
  // Padding se necessário
  if (numbers.length % 2 !== 0) numbers.push(23); // 'X' = 23

  let encryptedNums: number[] = [];
  for (let i = 0; i < numbers.length; i += 2) {
    const pair = [numbers[i], numbers[i + 1]];
    const enc = multiplyMatrix2x2(pair, matrix);
    encryptedNums.push(...enc);
  }
  return {
    encryptedNumbers: encryptedNums.join(','),
    encryptedText: numbersToText(encryptedNums)
  };
}