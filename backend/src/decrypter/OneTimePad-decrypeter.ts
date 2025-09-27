export function OneTimePadDecrypt(encryptedDecimals: string, key: string): string {
  const decimalsArray = encryptedDecimals.split(',').map(num => parseInt(num));
  let result = '';
  
  for (let i = 0; i < decimalsArray.length; i++) {
    const encryptedChar = decimalsArray[i]; // Número decimal criptografado
    const keyChar = key.charCodeAt(i % key.length); // Número decimal da chave
    const originalChar = encryptedChar ^ keyChar; // XOR para descriptografar
    result += String.fromCharCode(originalChar);
  }
  
  return result;
}