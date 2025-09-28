function textToNumbers(text: string): number[] {
  return text.toUpperCase().replace(/[^A-Z]/g, '').split('').map(c => c.charCodeAt(0) - 65);
}
function numbersToText(numbers: number[]): string {
  return numbers.map(n => String.fromCharCode((n % 26) + 65)).join('');
}
function multiplyMatrix2x2(vec: number[], mat: number[][]): number[] {
  return [
    (mat[0][0] * vec[0] + mat[0][1] * vec[1]) % 26,
    (mat[1][0] * vec[0] + mat[1][1] * vec[1]) % 26
  ];
}
function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error('Sem inverso modular');
}
function inverseMatrix2x2(mat: number[][]): number[][] {
  const det = (mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]) % 26;
  const detInv = modInverse(det, 26);
  return [
    [ ( mat[1][1] * detInv ) % 26, (-mat[0][1] * detInv + 26) % 26 ],
    [ (-mat[1][0] * detInv + 26) % 26, ( mat[0][0] * detInv ) % 26 ]
  ];
}
function keyToMatrix(key: string): number[][] {
  const nums = textToNumbers(key.padEnd(4, 'X').slice(0, 4));
  return [
    [nums[0], nums[1]],
    [nums[2], nums[3]]
  ];
}

export function HillDecrypt(encryptedDecimals: string, key: string): { decryptedText: string, decryptedNumbers: string } {
  const matrix = keyToMatrix(key);
  const invMatrix = inverseMatrix2x2(matrix);
  const numbers = encryptedDecimals.split(',').map(n => parseInt(n));
  let decryptedNums: number[] = [];
  for (let i = 0; i < numbers.length; i += 2) {
    const pair = [numbers[i], numbers[i + 1]];
    const dec = multiplyMatrix2x2(pair, invMatrix);
    decryptedNums.push(...dec);
  }
  return {
    decryptedText: numbersToText(decryptedNums),
    decryptedNumbers: decryptedNums.join(',')
  };
}