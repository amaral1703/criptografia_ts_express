import { ValidationResult } from "../../Models";

export function vigenereValidateDecryptionInput(text: any, key: any): ValidationResult {
  if (typeof text !== 'string' || text.trim().length === 0) {
    return { isValid: false, error: 'O texto cifrado não pode ser vazio.' };
  }
  if (typeof key !== 'string' || key.trim().length === 0) {
    return { isValid: false, error: 'A chave deve ser uma palavra ou frase não vazia.' };
  }
  // Opcional: limitar tamanho da chave e mensagem
  if (text.length > 10000) {
    return { isValid: false, error: 'O texto cifrado é muito longo (máximo 10.000 caracteres).' };
  }
  if (key.length > 1000) {
    return { isValid: false, error: 'A chave é muito longa (máximo 1.000 caracteres).' };
  }
  return { isValid: true };
}