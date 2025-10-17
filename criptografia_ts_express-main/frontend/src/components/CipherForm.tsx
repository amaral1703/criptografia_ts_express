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

    const getPlaceholder = () => {
        switch (cipherName) {
            case 'caesarcipher':
                return 'Digite um número de 1 a 25';
            case 'vigenere':
                return 'Digite uma palavra-chave (ex: CHAVE)';
            case 'hill':
                return 'Digite 4 números separados por vírgula (ex: 5, 8, 17, 3)';
            case 'otp':
                return 'Digite uma chave aleatória';
            default:
                return keyLabel;
        }
    };

    return (
        <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'hsl(var(--foreground))'
                }}>
                    Texto para criptografar/descriptografar:
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value.toUpperCase().replace(/[^A-Z0-9,.\s]/g, ''))}
                    rows={4}
                    className="input"
                    placeholder="Digite o texto aqui..."
                    style={{
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '100px'
                    }}
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'hsl(var(--foreground))'
                }}>
                    {keyLabel}:
                </label>
                {keyInputType === 'textarea' ? (
                    <textarea
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
                        rows={3}
                        className="input"
                        placeholder={getPlaceholder()}
                        style={{
                            width: '100%',
                            resize: 'vertical'
                        }}
                    />
                ) : (
                    <input
                        type={keyInputType === 'number' ? 'number' : 'text'}
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
                        className="input"
                        placeholder={getPlaceholder()}
                        style={{ width: '100%' }}
                    />
                )}
            </div>

            <div style={{ 
                display: 'flex', 
                gap: '0.75rem', 
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                <button 
                    onClick={() => handleAction('encrypt')} 
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ 
                        padding: '0.75rem 1.5rem',
                        minWidth: '140px',
                        backgroundColor: '#22c55e',
                        borderColor: '#22c55e'
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.currentTarget.style.backgroundColor = '#16a34a';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) {
                            e.currentTarget.style.backgroundColor = '#22c55e';
                        }
                    }}
                >
                    {loading ? 'Criptografando...' : 'Criptografar'}
                </button>
                <button 
                    onClick={() => handleAction('decrypt')} 
                    disabled={loading}
                    className="btn btn-destructive"
                    style={{ 
                        padding: '0.75rem 1.5rem',
                        minWidth: '140px'
                    }}
                >
                    {loading ? 'Descriptografando...' : 'Descriptografar'}
                </button>
            </div>

            {error && (
                <div style={{ 
                    marginTop: '1.5rem',
                    padding: '0.75rem',
                    backgroundColor: 'hsl(var(--destructive) / 0.1)',
                    border: '1px solid hsl(var(--destructive) / 0.2)',
                    borderRadius: 'calc(var(--radius) - 2px)',
                    color: 'hsl(var(--destructive))',
                    fontSize: '0.875rem'
                }}>
                    <strong>Erro:</strong> {error}
                </div>
            )}

            {result && (
                <div style={{ 
                    marginTop: '1.5rem',
                    padding: '0.75rem',
                    backgroundColor: 'hsl(210 40% 98% / 0.05)',
                    border: '1px solid hsl(210 40% 98% / 0.1)',
                    borderRadius: 'calc(var(--radius) - 2px)',
                    color: 'hsl(var(--primary))',
                    fontSize: '0.875rem'
                }}>
                    <strong>Resultado:</strong>
                    
                    {/* Texto resultado */}
                    <div style={{ marginTop: '0.5rem' }}>
                        <div style={{ 
                            marginBottom: '0.25rem',
                            fontSize: '0.75rem',
                            color: 'hsl(var(--muted-foreground))',
                            fontWeight: '500'
                        }}>
                            Texto:
                        </div>
                        <div style={{ 
                            padding: '0.5rem',
                            backgroundColor: 'hsl(var(--muted))',
                            borderRadius: 'calc(var(--radius) - 4px)',
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            wordBreak: 'break-all',
                            color: 'hsl(var(--foreground))'
                        }}>
                            {result.text}
                        </div>
                    </div>

                    {/* Números resultado (se disponível) */}
                    {result.numbers && (
                        <div style={{ marginTop: '0.75rem' }}>
                            <div style={{ 
                                marginBottom: '0.25rem',
                                fontSize: '0.75rem',
                                color: 'hsl(var(--muted-foreground))',
                                fontWeight: '500'
                            }}>
                                Números (códigos ASCII):
                            </div>
                            <div style={{ 
                                padding: '0.5rem',
                                backgroundColor: 'hsl(var(--secondary))',
                                borderRadius: 'calc(var(--radius) - 4px)',
                                fontFamily: 'monospace',
                                fontSize: '0.75rem',
                                wordBreak: 'break-all',
                                color: 'hsl(var(--secondary-foreground))',
                                border: '1px solid hsl(var(--border))'
                            }}>
                                {result.numbers}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CipherForm;