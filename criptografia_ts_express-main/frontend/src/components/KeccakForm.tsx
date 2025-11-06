import React, { useState } from 'react';

const KeccakForm: React.FC = () => {
    const [text, setText] = useState('');
    const [implementation, setImplementation] = useState<'pure' | 'library'>('library');
    const [result, setResult] = useState<{ text: string; numbers?: string; algorithm?: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleHash = async () => {
        if (!text.trim()) {
            alert('Por favor, preencha o texto.');
            return;
        }

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch('/api/hash/keccak', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, implementation }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Erro ao gerar hash.');
                setLoading(false);
                return;
            }

            if (data.hash) {
                setResult({
                    text: data.hash.encryptedText,
                    numbers: data.hash.encryptedNumbers,
                    algorithm: data.hash.algorithm
                });
            } else {
                setResult({ text: 'Hash gerado, mas resultado não encontrado.' });
            }

        } catch (err) {
            console.error('Erro de rede/servidor:', err);
            setError('Falha na comunicação com o servidor.');
        } finally {
            setLoading(false);
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
                    Texto para gerar hash:
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
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
                    Implementação:
                </label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="radio"
                            value="library"
                            checked={implementation === 'library'}
                            onChange={(e) => setImplementation(e.target.value as 'pure' | 'library')}
                            style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground))' }}>
                            Com Biblioteca (js-sha3) - Recomendado
                        </span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="radio"
                            value="pure"
                            checked={implementation === 'pure'}
                            onChange={(e) => setImplementation(e.target.value as 'pure' | 'library')}
                            style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground))' }}>
                            Implementação Pura (Educacional)
                        </span>
                    </label>
                </div>
                <p style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'hsl(var(--muted-foreground))',
                    fontStyle: 'italic'
                }}>
                    {implementation === 'library' 
                        ? '✓ Usa biblioteca otimizada e testada para produção'
                        : '⚠ Implementação didática - mais lenta, para fins educacionais'}
                </p>
            </div>

            <div style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={handleHash}
                    disabled={loading}
                    className="btn btn-primary"
                    style={{
                        padding: '0.75rem 1.5rem',
                        minWidth: '200px',
                        backgroundColor: '#3b82f6',
                        borderColor: '#3b82f6'
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) {
                            e.currentTarget.style.backgroundColor = '#3b82f6';
                        }
                    }}
                >
                    {loading ? 'Gerando Hash...' : 'Gerar Hash SHA-3'}
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

                    {result.algorithm && (
                        <div style={{
                            marginTop: '0.5rem',
                            marginBottom: '0.75rem',
                            fontSize: '0.75rem',
                            color: 'hsl(var(--muted-foreground))',
                            fontStyle: 'italic'
                        }}>
                            {result.algorithm}
                        </div>
                    )}

                    {/* Hash em hexadecimal */}
                    <div style={{ marginTop: '0.5rem' }}>
                        <div style={{
                            marginBottom: '0.25rem',
                            fontSize: '0.75rem',
                            color: 'hsl(var(--muted-foreground))',
                            fontWeight: '500'
                        }}>
                            Hash (Hexadecimal):
                        </div>
                        <div style={{
                            padding: '0.5rem',
                            backgroundColor: 'hsl(var(--muted))',
                            borderRadius: 'calc(var(--radius) - 4px)',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            wordBreak: 'break-all',
                            color: 'hsl(var(--foreground))'
                        }}>
                            {result.text}
                        </div>
                    </div>

                    {/* Números (bytes) */}
                    {result.numbers && (
                        <div style={{ marginTop: '0.75rem' }}>
                            <div style={{
                                marginBottom: '0.25rem',
                                fontSize: '0.75rem',
                                color: 'hsl(var(--muted-foreground))',
                                fontWeight: '500'
                            }}>
                                Hash (Bytes decimais):
                            </div>
                            <div style={{
                                padding: '0.5rem',
                                backgroundColor: 'hsl(var(--secondary))',
                                borderRadius: 'calc(var(--radius) - 4px)',
                                fontFamily: 'monospace',
                                fontSize: '0.7rem',
                                wordBreak: 'break-all',
                                color: 'hsl(var(--secondary-foreground))',
                                border: '1px solid hsl(var(--border))'
                            }}>
                                {result.numbers}
                            </div>
                        </div>
                    )}

                    <div style={{
                        marginTop: '1rem',
                        padding: '0.5rem',
                        backgroundColor: 'hsl(var(--accent) / 0.1)',
                        borderRadius: 'calc(var(--radius) - 4px)',
                        fontSize: '0.75rem',
                        color: 'hsl(var(--muted-foreground))'
                    }}>
                        ℹ️ <strong>Nota:</strong> Hashes são funções unidirecionais - não podem ser revertidos ao texto original.
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeccakForm;
