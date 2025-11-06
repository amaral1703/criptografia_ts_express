import React, { useState } from 'react';
import CaesarCipher from './components/CaesarCipher';
import VigenereCipher from './components/VigenereCipher';
import OTPCipher from './components/OTPCipher';
import HillCipher from './components/HillCipher';
import KeccakCipher from './components/KeccakCipher';
import Modal from './components/Modal';
import InfoIcon from './components/InfoIcon';
import CryptographyInfo from './components/CryptographyInfo';

type CipherType = 'Cesar' | 'Vigenere' | 'Hill' | 'OTP' | 'Keccak';

const App: React.FC = () => {
  const [currentCipher, setCurrentCipher] = useState<CipherType>('Cesar');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      case 'Keccak':
        return <KeccakCipher />;
      default:
        return <CaesarCipher />;
    }
  };

  const getCipherDisplayName = (cipher: CipherType): string => {
    switch (cipher) {
      case 'Cesar': return 'César';
      case 'Vigenere': return 'Vigenère';
      case 'Hill': return 'Hill';
      case 'OTP': return 'One-Time Pad';
      case 'Keccak': return 'Keccak (SHA-3)';
      default: return cipher;
    }
  };

  return (
    <div className="card" style={{
      padding: '2rem',
      maxWidth: '56rem',
      margin: '2rem auto',
      minHeight: 'calc(100vh - 4rem)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '2.25rem', 
          fontWeight: '700',
          margin: 0,
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--muted-foreground)))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Introdução à Criptografia
        </h1>
      </div>

      <nav style={{ 
        marginBottom: '2rem', 
        borderBottom: '1px solid hsl(var(--border))', 
        paddingBottom: '1rem'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {(['Cesar', 'Vigenere', 'Hill', 'OTP', 'Keccak'] as CipherType[]).map((cipher) => (
            <button
              key={cipher}
              onClick={() => setCurrentCipher(cipher)}
              className={`btn ${currentCipher === cipher ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              {getCipherDisplayName(cipher)}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600',
            margin: 0,
            color: 'hsl(var(--foreground))'
          }}>
            {getCipherDisplayName(currentCipher)}
          </h2>
          <InfoIcon 
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <main>
        {renderCipherComponent()}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Sobre ${getCipherDisplayName(currentCipher)}`}
      >
        <CryptographyInfo 
          type={currentCipher === 'Cesar' ? 'Caesar' : currentCipher === 'Keccak' ? 'Keccak' : currentCipher} 
        />
      </Modal>
    </div>
  );
};

export default App;