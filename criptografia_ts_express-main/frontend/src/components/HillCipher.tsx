import React from 'react';
import CipherForm from './CipherForm';

const parseHillKey = (keyString: string): string => { 
  return keyString.toUpperCase().replace(/[^A-Z]/g, ''); 
};

const HillCipher: React.FC = () => {
  return (
    <CipherForm
      cipherName="hill"
      keyLabel="Cifra de Hill (Chave: Palavra de 4 letras ex: HILL)" 
      keyInputType="text"
      keyParser={parseHillKey}
    />
  );
};

export default HillCipher;