import React from 'react';

interface CryptographyInfoProps {
  type: 'Caesar' | 'Vigenere' | 'Hill' | 'OTP';
}

const CryptographyInfo: React.FC<CryptographyInfoProps> = ({ type }) => {
  const getInfo = () => {
    switch (type) {
      case 'Caesar':
        return {
          title: 'Cifra de César',
          description: 'A Cifra de César é uma das técnicas de criptografia mais antigas e simples. Cada letra do texto original é substituída por outra letra que se encontra um número fixo de posições adiante no alfabeto.',
          howItWorks: [
            'Escolha um número (chave) entre 1 e 25',
            'Para cada letra, mova-a esse número de posições no alfabeto',
            'Se passar do Z, continue do A (rotação circular)',
            'Exemplo: com chave 3, A→D, B→E, C→F, ..., X→A, Y→B, Z→C'
          ],
          codeExample: `export function CaesarCipherEncrypt(input: string, key: number) {
  key = Math.floor(key);
  let numbers: number[] = [];
  let text: string = '';
  
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    
    if (charCode >= 65 && charCode <= 90) { // A-Z
      const shifted = ((charCode - 65 + key) % 26) + 65;
      numbers.push(shifted);
      text += String.fromCharCode(shifted);
    } 
    // ... continua para minúsculas e outros caracteres
  }
  
  return { encryptedNumbers: numbers.join(','), encryptedText: text };
}`,
          security: 'Muito baixa - apenas 25 chaves possíveis, facilmente quebrada por força bruta ou análise de frequência.',
          usage: 'Educacional e histórica. Não deve ser usada para proteger informações reais.'
        };

      case 'Vigenere':
        return {
          title: 'Cifra de Vigenère',
          description: 'A Cifra de Vigenère usa uma palavra-chave para criar múltiplos deslocamentos diferentes, tornando-a mais segura que a Cifra de César. Foi considerada "indecifrável" por séculos.',
          howItWorks: [
            'Use uma palavra-chave (exemplo: "CHAVE")',
            'Repita a chave até cobrir todo o texto',
            'Para cada posição, some o valor da letra original com o valor da letra da chave',
            'Exemplo: "HELLO" + "CHAVE" → C+H=J, H+A=H, A+V=V, V+E=Z, E+C=G → "JHVZG"'
          ],
          codeExample: `export function VigenereEncrypt(input: string, key: string) {
  // Repete a chave até o tamanho da mensagem
  let fullKey = key;
  while (fullKey.length < input.length) {
    fullKey += key;
  }
  
  let numbers: number[] = [];
  let text: string = '';

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    const keyCharCode = fullKey.charCodeAt(i);

    if (charCode >= 65 && charCode <= 90) {
      // Soma o deslocamento da chave
      const shifted = ((charCode - 65 + (keyCharCode - 65)) % 26) + 65;
      numbers.push(shifted);
      text += String.fromCharCode(shifted);
    }
    // ... continua
  }
  
  return { encryptedNumbers: numbers.join(','), encryptedText: text };
}`,
          security: 'Média - pode ser quebrada com análise de frequência avançada (Teste de Kasiski) se a chave for curta.',
          usage: 'Histórica e educacional. Muito usada nos séculos XVI-XIX.'
        };

      case 'Hill':
        return {
          title: 'Cifra de Hill',
          description: 'A Cifra de Hill usa álgebra linear (multiplicação de matrizes) para criptografar blocos de texto. Inventada por Lester Hill em 1929, foi uma das primeiras cifras baseadas em matemática.',
          howItWorks: [
            'Converta letras em números (A=0, B=1, ..., Z=25)',
            'Agrupe o texto em blocos (ex: pares de letras)',
            'Use uma matriz 2x2 como chave',
            'Multiplique cada bloco pela matriz chave',
            'Aplique módulo 26 ao resultado',
            'Converta de volta para letras'
          ],
          codeExample: `function multiplyMatrix2x2(vec: number[], mat: number[][]): number[] {
  return [
    mod(mat[0][0] * vec[0] + mat[0][1] * vec[1], 26),
    mod(mat[1][0] * vec[0] + mat[1][1] * vec[1], 26)
  ];
}

export function HillEncrypt(plainText: string, key: string) {
  const matrix = keyToMatrix(key); // Converte chave em matriz 2x2
  let numbers = textToNumbers(plainText);
  
  if (numbers.length % 2 !== 0) numbers.push(23); // Padding com 'X'

  let encryptedNums: number[] = [];
  for (let i = 0; i < numbers.length; i += 2) {
    const pair = [numbers[i], numbers[i + 1]];
    const enc = multiplyMatrix2x2(pair, matrix);
    encryptedNums.push(...enc);
  }
  
  return {
    encryptedNumbers: encryptedNums.join(','),
    encryptedText: numbersToText(encryptedNums)
  };
}`,
          security: 'Média-alta - resistente à análise de frequência simples, mas vulnerável se a chave for conhecida ou se houver muitos pares conhecidos de texto claro/cifrado.',
          usage: 'Educacional e base para criptografias modernas mais complexas.'
        };

      case 'OTP':
        return {
          title: 'One-Time Pad (Cifra de Uso Único)',
          description: 'O One-Time Pad é teoricamente inquebrável quando usado corretamente. Usa uma chave aleatória do mesmo tamanho do texto e operação XOR para criptografar.',
          howItWorks: [
            'Gere uma chave completamente aleatória do mesmo tamanho do texto',
            'Converta texto e chave em valores binários/numéricos',
            'Aplique operação XOR bit a bit',
            'O resultado é o texto criptografado',
            'IMPORTANTE: A chave só pode ser usada UMA vez'
          ],
          codeExample: `export function OneTimePadEncrypt(input: string, key: string): string {
  let result: number[] = [];
  
  for (let i = 0; i < input.length; i++) {
    const inputChar = input.charCodeAt(i); // Valor ASCII do caractere
    const keyChar = key.charCodeAt(i % key.length); // Valor ASCII da chave
    const xorValue = inputChar ^ keyChar; // Operação XOR
    result.push(xorValue); // Mantém em decimal
  }
  
  // Retorna array de números como string separada por vírgulas
  return result.join(',');
}`,
          security: 'PERFEITA - matematicamente inquebrável se: (1) a chave for verdadeiramente aleatória, (2) do mesmo tamanho do texto, (3) usada apenas uma vez, (4) mantida em segredo.',
          usage: 'Diplomacia de alto nível, comunicações militares críticas. Impraticável para uso comum devido ao tamanho das chaves.'
        };

      default:
        return null;
    }
  };

  const info = getInfo();
  if (!info) return null;

  return (
    <div style={{ color: 'hsl(var(--foreground))' }}>
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ 
          marginBottom: '1rem', 
          color: 'hsl(var(--muted-foreground))',
          lineHeight: '1.6'
        }}>
          {info.description}
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          marginBottom: '0.75rem',
          color: 'hsl(var(--foreground))'
        }}>
          Como Funciona:
        </h3>
        <ol style={{ 
          paddingLeft: '1.25rem', 
          margin: '0',
          color: 'hsl(var(--muted-foreground))'
        }}>
          {info.howItWorks.map((step, index) => (
            <li key={index} style={{ marginBottom: '0.5rem', lineHeight: '1.5' }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          marginBottom: '0.75rem',
          color: 'hsl(var(--foreground))'
        }}>
          Implementação (Backend):
        </h3>
        <pre style={{
          background: 'hsl(var(--muted))',
          padding: '1rem',
          borderRadius: 'calc(var(--radius) - 2px)',
          overflow: 'auto',
          fontSize: '0.75rem',
          lineHeight: '1.4',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))'
        }}>
          <code>{info.codeExample}</code>
        </pre>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          marginBottom: '0.75rem',
          color: 'hsl(var(--foreground))'
        }}>
          Segurança:
        </h3>
        <p style={{ 
          margin: '0',
          color: 'hsl(var(--muted-foreground))',
          lineHeight: '1.6'
        }}>
          {info.security}
        </p>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          marginBottom: '0.75rem',
          color: 'hsl(var(--foreground))'
        }}>
          Uso Prático:
        </h3>
        <p style={{ 
          margin: '0',
          color: 'hsl(var(--muted-foreground))',
          lineHeight: '1.6'
        }}>
          {info.usage}
        </p>
      </div>
    </div>
  );
};

export default CryptographyInfo;