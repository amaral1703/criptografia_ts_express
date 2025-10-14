import { ValidationResult } from "../../Models";

export function otpValidateDecryptionInput(text: any, key: any): ValidationResult {
  // Verificação básica de existência
  if (!text || !key) {
    return { isValid: false, error: 'Texto e chave são obrigatórios' };
  }

  // Verificação de tipo
  if (typeof text !== 'string' || typeof key !== 'string') {
    return { isValid: false, error: 'Texto e chave devem ser strings' };
  }

  // Verificação de chave vazia
  if (key.trim().length === 0) {
    return { isValid: false, error: 'Chave não pode estar vazia' };
  }

  // Verificar formato decimal (números separados por vírgula)
  if (!/^(\d+)(,\d+)*$/.test(text.trim())) {
    return { isValid: false, error: 'Formato inválido. Use números decimais separados por vírgula' };
  }

  return { isValid: true };
}