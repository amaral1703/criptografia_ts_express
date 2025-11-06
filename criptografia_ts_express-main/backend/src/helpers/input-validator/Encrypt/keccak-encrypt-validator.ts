import { ValidationResult } from '../../Models';

export function keccakValidateEncryptionInput(
  text: string,
  implementation: string
): ValidationResult {
  // Verifica se o texto está vazio
  if (!text || text.trim() === '') {
    return {
      isValid: false,
      error: 'O texto não pode estar vazio.'
    };
  }

  // Verifica se a implementação é válida
  const validImplementations = ['pure', 'library'];
  if (!implementation || !validImplementations.includes(implementation.toLowerCase())) {
    return {
      isValid: false,
      error: 'Implementação deve ser "pure" (sem biblioteca) ou "library" (com biblioteca).'
    };
  }

  return { isValid: true };
}
