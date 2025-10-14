import { useState } from 'react';

type CipherName = 'otp' | 'caesarcipher' | 'vigenere' | 'hill';
type CipherAction = 'encrypt' | 'decrypt';
type CipherKey = string | number | number[]; 

interface CipherDetails {
  decryptedText?: string;
  encryptedText?: string;
  decryptedNumbers?: string;
  encryptedNumbers?: string;
}

interface CipherResult {
  encrypted?: string | CipherDetails; 
  decrypted?: string | CipherDetails; 
}

interface CipherHook {
  result: string | null;
  error: string | null;
  loading: boolean;
  
  processCipher: (
    cipherName: CipherName, 
    action: CipherAction, 
    text: string, 
    key: CipherKey
  ) => Promise<void>;
}

export const useCipher = (): CipherHook => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const processCipher = async (
    cipherName: CipherName,
    action: CipherAction,
    text: string,
    key: CipherKey
  ) => {
    setLoading(true);
    setResult(null);
    setError(null);

    const requestBody = { text, key };

    try {
      const response = await fetch(`/api/${action}/${cipherName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || `Erro desconhecido ao ${action} com ${cipherName}.`);
        setLoading(false);
        return;
      }
      
      const cipherResult = data as CipherResult;
      let finalResultText: string | null = null;

      // === LÓGICA DE EXTRAÇÃO DE RESULTADO ===
      if (cipherResult.encrypted) {
        if (typeof cipherResult.encrypted === 'string') {
          finalResultText = cipherResult.encrypted;
        } else if (cipherResult.encrypted.encryptedText) {
          finalResultText = cipherResult.encrypted.encryptedText;
        }
      } 
      else if (cipherResult.decrypted) {
        if (typeof cipherResult.decrypted === 'string') {
          finalResultText = cipherResult.decrypted;
        } else if (cipherResult.decrypted.decryptedText) {
          finalResultText = cipherResult.decrypted.decryptedText;
        }
      }

      // === ATUALIZAÇÃO DO ESTADO ===
      if (finalResultText) {
        const actionLabel = action === 'encrypt' ? 'Cifrado' : 'Decifrado';
        setResult(`${actionLabel}: ${finalResultText}`);
      } else {
        setResult('Operação concluída, mas o resultado não foi encontrado.');
      }

    } catch (err) {
      console.error('Erro de rede/servidor:', err);
      setError('Falha na comunicação com o servidor de criptografia.');
    } finally {
      setLoading(false);
    }
  };

  return { result, error, loading, processCipher };
};