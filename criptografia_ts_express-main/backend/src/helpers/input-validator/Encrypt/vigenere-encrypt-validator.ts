import { ValidationResult } from "../../Models";

export function vigenereValidateEncryptionInput(text: any, key: any): ValidationResult {
  if (typeof text !== 'string' || text.trim().length === 0) {
    return { isValid: false, error: 'A mensagem deve ser uma frase não vazia.' };
  }
  // Verifica se há pelo menos 4 palavras
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 4) {
    return { isValid: false, error: 'A mensagem deve conter no mínimo quatro palavras.' };
  }
  if (typeof key !== 'string' || key.trim().length === 0) {
    return { isValid: false, error: 'A chave deve ser uma palavra ou frase não vazia.' };
  }
  // Opcional: limitar tamanho da chave e mensagem
  if (text.length > 10000) {
    return { isValid: false, error: 'A mensagem é muito longa (máximo 10.000 caracteres).' };
  }
  if (key.length > 1000) {
    return { isValid: false, error: 'A chave é muito longa (máximo 1.000 caracteres).' };
  }
  return { isValid: true };
}
