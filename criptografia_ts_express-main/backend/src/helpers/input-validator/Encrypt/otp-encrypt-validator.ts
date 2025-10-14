import { ValidationResult } from "../../Models";

export function otpValidateEncryptionInput(text: any, key: any): ValidationResult {
  // Verificação básica de existência
  if (!text || !key) {
    return { isValid: false, error: 'Texto e chave são obrigatórios' };
  }

  // Verificação de tipo
  if (typeof text !== 'string' || typeof key !== 'string') {
    return { isValid: false, error: 'Texto e chave devem ser strings' };
  }

  // Verificação de conteúdo vazio
  if (text.trim().length === 0 || key.trim().length === 0) {
    return { isValid: false, error: 'Texto e chave não podem estar vazios' };
  }

  // Limite de tamanho
  if (text.length > 10000) {
    return { isValid: false, error: 'Texto muito longo (máximo 10.000 caracteres)' };
  }

  // Chave mínima
  if (key.length < 1) {
    return { isValid: false, error: 'Chave deve ter pelo menos 1 caractere' };
  }

  if (key.length < text.length) {
    return { isValid: false, error: 'Chave deve ser igual ou maior em tamanho que a mensagem' };
  }

  return { isValid: true };
}