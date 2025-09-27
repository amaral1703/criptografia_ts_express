export function CaesarCipherDecrypt(encryptedDecimals: string, key: number): string {
  // Garantir que a chave seja um número inteiro
  key = Math.floor(key);
  
  const decimalsArray = encryptedDecimals.split(',').map(num => parseInt(num));
  let result = '';
  
  for (let i = 0; i < decimalsArray.length; i++) {
    const charCode = decimalsArray[i];
    
    // Reverter o deslocamento apenas para letras (maiúsculas e minúsculas)
    if (charCode >= 65 && charCode <= 90) {
      // Letras maiúsculas (A-Z: 65-90)
      // Adicionamos 26 antes do módulo para tratar chaves negativas
      const shifted = ((charCode - 65 - key + 26) % 26) + 65;
      result += String.fromCharCode(shifted);
    } 
    else if (charCode >= 97 && charCode <= 122) {
      // Letras minúsculas (a-z: 97-122)
      // Adicionamos 26 antes do módulo para tratar chaves negativas
      const shifted = ((charCode - 97 - key + 26) % 26) + 97;
      result += String.fromCharCode(shifted);
    } 
    else {
      // Outros caracteres (espaço, pontuação, etc.) permanecem inalterados
      result += String.fromCharCode(charCode);
    }
  }
  
  return result;
}