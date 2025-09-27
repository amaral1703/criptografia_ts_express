export function CaesarCipherDecrypt(encryptedDecimals: string, key: number): { decryptedText: string, decryptedNumbers: string } {
  key = Math.floor(key);

  const decimalsArray = encryptedDecimals.split(',').map(num => parseInt(num));
  let text = '';
  let numbers: number[] = [];

  for (let i = 0; i < decimalsArray.length; i++) {
    const charCode = decimalsArray[i];

    if (charCode >= 65 && charCode <= 90) {
      const shifted = ((charCode - 65 - key + 26) % 26) + 65;
      text += String.fromCharCode(shifted);
      numbers.push(shifted);
    } 
    else if (charCode >= 97 && charCode <= 122) {
      const shifted = ((charCode - 97 - key + 26) % 26) + 97;
      text += String.fromCharCode(shifted);
      numbers.push(shifted);
    } 
    else {
      text += String.fromCharCode(charCode);
      numbers.push(charCode);
    }
  }

  return {
    decryptedText: text,
    decryptedNumbers: numbers.join(',')
  };
}