import React from 'react';
import CipherForm from './CipherForm';

const parseCaesarKey = (keyString: string): number => {
  const key = parseInt(keyString.trim(), 10);
  return isNaN(key) ? 0 : key;
};

const CaesarCipher: React.FC = () => {
  return (
    <CipherForm
      cipherName="caesarcipher"
      keyLabel="Cifra de César (Chave de Deslocamento)"
      keyInputType="number"
      keyParser={parseCaesarKey}
    />
  );
};

export default CaesarCipher;