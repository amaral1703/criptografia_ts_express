import { ValidationResult } from "../../Models";

export function caesarValidateEncryptionInput(text: any, key: any): ValidationResult {
  if (typeof text !== 'string' || text.trim().length === 0) {
    return { isValid: false, error: 'A mensagem deve ser uma palavra ou frase não vazia.' };
  }
  if (typeof key !== 'number' && typeof key !== 'string') {
    return { isValid: false, error: 'A chave deve ser um número.' };
  }
  const keyNum = Number(key);
  if (isNaN(keyNum) || !Number.isFinite(keyNum)) {
    return { isValid: false, error: 'A chave deve ser um número válido.' };
  }
  if (!Number.isInteger(keyNum)) {
    return { isValid: false, error: 'A chave deve ser um número inteiro.' };
  }
  // Opcional: limite de tamanho da mensagem
  if (text.length > 10000) {
    return { isValid: false, error: 'A mensagem é muito longa (máximo 10.000 caracteres).' };
  }
  return { isValid: true };
}
