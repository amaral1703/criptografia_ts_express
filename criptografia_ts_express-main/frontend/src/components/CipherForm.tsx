import React, { useState } from 'react';
import { useCipher } from '../hooks/useCipher';

interface CipherFormProps {
    cipherName: 'otp' | 'caesarcipher' | 'vigenere' | 'hill';
    keyLabel: string;
    keyInputType: 'text' | 'number' | 'textarea';
    keyParser: (key: string) => string | number | number[];
}

const CipherForm: React.FC<CipherFormProps> = ({ cipherName, keyLabel, keyInputType, keyParser }) => {
    const [text, setText] = useState('');
    const [keyInput, setKeyInput] = useState('');
    const { result, error, loading, processCipher } = useCipher();

    const handleAction = async (action: 'encrypt' | 'decrypt') => {
        const parsedKey = keyParser(keyInput);

        if (!text.trim() || !keyInput.trim()) {
            alert('Por favor, preencha o texto e a chave.');
            return;
        }

        await processCipher(cipherName, action, text, parsedKey);
    };

    return (
        <div style={{
            border: '1px solid #993333',
            padding: '20px',
            borderRadius: '8px',
            marginTop: '20px',
            backgroundColor: '#4e1919',
            color: '#f0f0f0'
        }}>
            <h2>{keyLabel.split('(')[0].trim()}</h2>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#f0f0f0' }}>Texto:</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value.toUpperCase().replace(/[^A-Z0-9,\.\s]/g, ''))}
                    rows={3}
                    style={{
                        width: '100%',
                        padding: '8px',
                        boxSizing: 'border-box',
                        backgroundColor: '#1a0000',
                        color: '#f0f0f0',
                        border: '1px solid #555',
                        borderRadius: '4px'
                    }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#f0f0f0' }}>{keyLabel}:</label>
                {keyInputType === 'textarea' ? (
                    <textarea
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
                        rows={3}
                        placeholder="Exemplo para Hill: 5, 8, 17, 3"
                        style={{
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                            backgroundColor: '#333',
                            color: '#f0f0f0',
                            border: '1px solid #555',
                            borderRadius: '4px'
                        }}
                    />
                ) : (
                    <input
                        type={keyInputType === 'number' ? 'number' : 'text'}
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
                        placeholder={keyLabel}
                        style={{
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                            backgroundColor: '#1a0000',
                            color: '#f0f0f0',
                            border: '1px solid #555',
                            borderRadius: '4px'
                        }}
                    />
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={() => handleAction('encrypt')} disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
                    {loading ? 'Criptografando...' : 'Criptografar'}
                </button>
                <button onClick={() => handleAction('decrypt')} disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
                    {loading ? 'Descriptografando...' : 'Descriptografar'}
                </button>
            </div>

            {error && <p style={{ color: '#dc3545', marginTop: '15px', fontWeight: 'bold' }}>Erro: {error}</p>}
            {result && <p style={{ color: '#007bff', marginTop: '15px', fontWeight: 'bold' }}>Resultado: {result}</p>}
        </div>
    );
};

export default CipherForm;