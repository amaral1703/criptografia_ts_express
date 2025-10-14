import React from 'react';
import CipherForm from './CipherForm';

const parseOTPKey = (keyString: string): string => {
  return keyString.toUpperCase().replace(/[^A-Z]/g, ''); 
};

const OTPCipher: React.FC = () => {
  return (
    <CipherForm
      cipherName="otp"
      keyLabel="Vernam (Chave - Deve ter o mesmo tamanho do texto)"
      keyInputType="text"
      keyParser={parseOTPKey}
    />
  );
};

export default OTPCipher;