// Implementação do Keccak-256 (SHA-3) usando biblioteca js-sha3
import { sha3_256 } from 'js-sha3';

// Função exportada para criptografia Keccak-256 (usando biblioteca)
export function KeccakEncryptLib(input: string): { 
  encryptedText: string, 
  encryptedNumbers: string,
  algorithm: string 
} {
  // Calcula o hash SHA3-256
  const hashHex = sha3_256(input);
  
  // Converte hex para array de números
  const hashBytes: number[] = [];
  for (let i = 0; i < hashHex.length; i += 2) {
    hashBytes.push(parseInt(hashHex.substr(i, 2), 16));
  }
  
  return {
    encryptedText: hashHex,
    encryptedNumbers: hashBytes.join(','),
    algorithm: 'Keccak-256 (SHA-3) - Library Implementation'
  };
}
