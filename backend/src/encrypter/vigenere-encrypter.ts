export function VigenereEncrypt(input: string, key: string): { encryptedNumbers: string, encryptedText: string } {
  // Repete a chave até o tamanho da mensagem
  let fullKey = key;
  while (fullKey.length < input.length) {
    fullKey += key;
  }
  fullKey = fullKey.slice(0, input.length);

  let numbers: number[] = [];
  let text: string = '';

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    const keyCharCode = fullKey.charCodeAt(i);

    // Só cifra letras (maiúsculas e minúsculas)
    if (charCode >= 65 && charCode <= 90) {
      // Maiúsculas
      const shifted = ((charCode - 65 + (keyCharCode - 65)) % 26) + 65;
      numbers.push(shifted);
      text += String.fromCharCode(shifted);
    } else if (charCode >= 97 && charCode <= 122) {
      // Minúsculas
      const shifted = ((charCode - 97 + (keyCharCode - 97)) % 26) + 97;
      numbers.push(shifted);
      text += String.fromCharCode(shifted);
    } else {
      // Outros caracteres permanecem inalterados
      numbers.push(charCode);
      text += String.fromCharCode(charCode);
    }
  }

  return {
    encryptedNumbers: numbers.join(','),
    encryptedText: text
  };
}