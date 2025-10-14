import React from 'react';
import CipherForm from './CipherForm';

const parseVigenereKey = (keyString: string): string => {
  return keyString.toUpperCase().replace(/[^A-Z]/g, ''); 
};

const VigenereCipher: React.FC = () => {
  return (
    <CipherForm
      cipherName="vigenere"
      keyLabel="Cifra de Vigenère (Palavra Chave)"
      keyInputType="text"
      keyParser={parseVigenereKey}
    />
  );
};

export default VigenereCipher;