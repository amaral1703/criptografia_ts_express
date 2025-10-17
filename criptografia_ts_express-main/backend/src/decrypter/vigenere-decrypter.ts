export function VigenereDecrypt(encryptedDecimals: string, key: string): { decryptedText: string, decryptedNumbers: string } {
  const decimalsArray = encryptedDecimals.split(',').map(num => parseInt(num));

  // Repete a chave até o tamanho da mensagem
  let fullKey = key;
  while (fullKey.length < decimalsArray.length) {
    fullKey += key;
  }
  fullKey = fullKey.slice(0, decimalsArray.length);

  let text = '';
  let numbers: number[] = [];

  for (let i = 0; i < decimalsArray.length; i++) {
    const charCode = decimalsArray[i];
    const keyCharCode = fullKey.charCodeAt(i);

    if (charCode >= 65 && charCode <= 90) {
      // Maiúsculas
      const shifted = ((charCode - 65 - (keyCharCode - 65) + 26) % 26) + 65;
      text += String.fromCharCode(shifted);
      numbers.push(shifted);
    } else if (charCode >= 97 && charCode <= 122) {
      // Minúsculas
      const shifted = ((charCode - 97 - (keyCharCode - 97) + 26) % 26) + 97;
      text += String.fromCharCode(shifted);
      numbers.push(shifted);
    } else {
      text += String.fromCharCode(charCode);
      numbers.push(charCode);
    }
  }

  return {
    decryptedText: text,
    decryptedNumbers: numbers.join(',')
  };
}