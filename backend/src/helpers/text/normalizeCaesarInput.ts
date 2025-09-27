import { textToDecimals } from "./textToDecimals";

export function normalizeCaesarInput(text: string): string {
  // Se já for decimal separado por vírgula, retorna como está
  if (/^(\d+)(,\d+)*$/.test(text.trim())) {
    return text;
  }
  // Se for texto, converte cada caractere para seu código decimal
  return textToDecimals(text)
}