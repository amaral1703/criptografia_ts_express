import { ValidationResult } from "../../Models";


function textToNumbers(text: string): number[] {
  return text.toUpperCase().replace(/[^A-Z]/g, '').split('').map(c => c.charCodeAt(0) - 65);
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function keyToMatrix(key: string): number[][] {
  const nums = textToNumbers(key.padEnd(4, 'X').slice(0, 4));
  return [
    [nums[0], nums[1]],
    [nums[2], nums[3]]
  ];
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function isMatrixInvertible(mat: number[][]): boolean {
  const det = mod(mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0], 26);
  return gcd(det, 26) === 1;
}

export function hillValidateDecryptionInput(text: any, key: any): ValidationResult {
  // Verificação básica de existência
  if (!text || !key) {
    return { isValid: false, error: 'Texto cifrado e chave são obrigatórios' };
  }

  // Verificação de tipo
  if (typeof text !== 'string' || typeof key !== 'string') {
    return { isValid: false, error: 'Texto cifrado e chave devem ser strings' };
  }

  // Verificação de conteúdo vazio
  if (text.trim().length === 0 || key.trim().length === 0) {
    return { isValid: false, error: 'Texto cifrado e chave não podem estar vazios' };
  }

  // Limite de tamanho
  if (text.length > 10000) {
    return { isValid: false, error: 'Texto cifrado muito longo (máximo 10.000 caracteres)' };
  }

  if (key.length > 1000) {
    return { isValid: false, error: 'Chave muito longa (máximo 1.000 caracteres)' };
  }

  // Verificação se a chave gera uma matriz invertível
  try {
    const matrix = keyToMatrix(key);
    if (!isMatrixInvertible(matrix)) {
      return { isValid: false, error: 'A chave não gera uma matriz invertível módulo 26. Escolha outra chave com letras diferentes.' };
    }
  } catch (error) {
    return { isValid: false, error: 'Erro ao processar a chave fornecida' };
  }

  return { isValid: true };
}