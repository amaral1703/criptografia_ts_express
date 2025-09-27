export function CaesarCipherEncrypt(input: string, key: number): { encryptedNumbers: string, encryptedText: string } {
  key = Math.floor(key);
  
  let numbers: number[] = [];
  let text: string = '';
  
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    
    if (charCode >= 65 && charCode <= 90) {
      const shifted = ((charCode - 65 + key) % 26) + 65;
      numbers.push(shifted);
      text += String.fromCharCode(shifted);
    } 
    else if (charCode >= 97 && charCode <= 122) {
      const shifted = ((charCode - 97 + key) % 26) + 97;
      numbers.push(shifted);
      text += String.fromCharCode(shifted);
    } 
    else {
      numbers.push(charCode);
      text += String.fromCharCode(charCode);
    }
  }
  
  return {
    encryptedNumbers: numbers.join(','),
    encryptedText: text
  };
}