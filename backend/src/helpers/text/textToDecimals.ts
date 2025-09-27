export function textToDecimals(text: string): string {
  return text.split('').map(c => c.charCodeAt(0)).join(',');
}