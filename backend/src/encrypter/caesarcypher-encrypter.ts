export function CaesarCipherEncrypt(input: string, key: number): string {
  // Garantir que a chave seja um número inteiro
  key = Math.floor(key);
  
  let result: number[] = [];
  
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    
    // Aplicar o deslocamento apenas para letras (maiúsculas e minúsculas)
    if (charCode >= 65 && charCode <= 90) {
      // Letras maiúsculas (A-Z: 65-90)
      const shifted = ((charCode - 65 + key) % 26) + 65;
      result.push(shifted);
    } 
    else if (charCode >= 97 && charCode <= 122) {
      // Letras minúsculas (a-z: 97-122)
      const shifted = ((charCode - 97 + key) % 26) + 97;
      result.push(shifted);
    } 
    else {
      // Outros caracteres (espaço, pontuação, etc.) permanecem inalterados
      result.push(charCode);
    }
  }
  
  // Retornar array de números decimais como string separada por vírgulas
  return result.join(',');
}