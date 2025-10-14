import React, { useState } from 'react';
import CaesarCipher from './components/CaesarCipher';
import VigenereCipher from './components/VigenereCipher';
import OTPCipher from './components/OTPCipher';
import HillCipher from './components/HillCipher';

type CipherType = 'Cesar' | 'Vigenere' | 'Hill' | 'OTP';

const App: React.FC = () => {
  const [currentCipher, setCurrentCipher] = useState<CipherType>('Cesar');

  const renderCipherComponent = () => {
    switch (currentCipher) {
      case 'Cesar':
        return <CaesarCipher />;
      case 'Vigenere':
        return <VigenereCipher />;
      case 'Hill':
        return <HillCipher />;
      case 'OTP':
        return <OTPCipher />;
      default:
        return <CaesarCipher />;
    }
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#631e1e',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
    }}>
      <h1>**Simulador de Criptografia**</h1>

      <nav style={{ marginBottom: '20px', borderBottom: '1px solid #993333', paddingBottom: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {['Cesar', 'Vigenere', 'Hill', 'OTP'].map((cipher) => (
          <button
            key={cipher}
            onClick={() => setCurrentCipher(cipher as CipherType)}
            style={{
              padding: '10px 15px',
              cursor: 'pointer',
              fontWeight: currentCipher === cipher ? 'bold' : 'normal',
              backgroundColor: currentCipher === cipher ? '#d64343ff' : '#1a0000',
              color: 'white',
              border: '1px solid #999',
              borderRadius: '5px'
            }}
          >
            {cipher}
          </button>
        ))}
      </nav>

      <main>
        {renderCipherComponent()}
      </main>
    </div>
  );
};

export default App;