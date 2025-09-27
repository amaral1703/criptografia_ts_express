export function OneTimePadEncrypt(input: string, key: string): string {
  let result: number[] = [];
  
  for (let i = 0; i < input.length; i++) {
    const inputChar = input.charCodeAt(i); // Número decimal do caractere
    const keyChar = key.charCodeAt(i % key.length); // Número decimal da chave
    const xorValue = inputChar ^ keyChar; // XOR
    result.push(xorValue); // Mantém em decimal
  }
  
  // Retorna array de números decimais como string separada por vírgulas
  return result.join(',');
}