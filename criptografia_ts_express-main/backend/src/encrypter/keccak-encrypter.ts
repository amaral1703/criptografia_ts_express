// Implementação pura do Keccak-256 (SHA-3) sem biblioteca externa
// Baseado na especificação NIST FIPS 202

// Constantes de rotação para cada posição
const ROTATION_OFFSETS = [
  [0, 1, 62, 28, 27],
  [36, 44, 6, 55, 20],
  [3, 10, 43, 25, 39],
  [41, 45, 15, 21, 8],
  [18, 2, 61, 56, 14]
];

// Constantes de round (primeiros 24 valores de uma LFSR)
const ROUND_CONSTANTS = [
  0x0000000000000001n, 0x0000000000008082n, 0x800000000000808an, 0x8000000080008000n,
  0x000000000000808bn, 0x0000000080000001n, 0x8000000080008081n, 0x8000000000008009n,
  0x000000000000008an, 0x0000000000000088n, 0x0000000080008009n, 0x000000008000000an,
  0x000000008000808bn, 0x800000000000008bn, 0x8000000000008089n, 0x8000000000008003n,
  0x8000000000008002n, 0x8000000000000080n, 0x000000000000800an, 0x800000008000000an,
  0x8000000080008081n, 0x8000000000008080n, 0x0000000080000001n, 0x8000000080008008n
];

// Rotação de bits para BigInt
function rotateLeft(value: bigint, shift: number): bigint {
  return ((value << BigInt(shift)) | (value >> (64n - BigInt(shift)))) & 0xFFFFFFFFFFFFFFFFn;
}

// Converte string para array de bytes
function stringToBytes(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// Converte array de bytes para BigInt (little-endian)
function bytesToBigInt(bytes: Uint8Array, offset: number, length: number): bigint {
  let result = 0n;
  for (let i = 0; i < length; i++) {
    result |= BigInt(bytes[offset + i]) << (BigInt(i) * 8n);
  }
  return result;
}

// Converte BigInt para array de bytes (little-endian)
function bigIntToBytes(value: bigint, length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = Number((value >> (BigInt(i) * 8n)) & 0xFFn);
  }
  return bytes;
}

// Função theta (θ)
function theta(state: bigint[][]): bigint[][] {
  const C = Array.from({ length: 5 }, () => 0n);
  const D = Array.from({ length: 5 }, () => 0n);
  
  for (let x = 0; x < 5; x++) {
    C[x] = state[x][0] ^ state[x][1] ^ state[x][2] ^ state[x][3] ^ state[x][4];
  }
  
  for (let x = 0; x < 5; x++) {
    D[x] = C[(x + 4) % 5] ^ rotateLeft(C[(x + 1) % 5], 1);
  }
  
  const newState: bigint[][] = Array(5).fill(0).map(() => Array(5).fill(0n));
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      newState[x][y] = state[x][y] ^ D[x];
    }
  }
  
  return newState;
}

// Função rho e pi (ρ e π)
function rhoPi(state: bigint[][]): bigint[][] {
  const newState: bigint[][] = Array(5).fill(0).map(() => Array(5).fill(0n));
  
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      const newX = y;
      const newY = (2 * x + 3 * y) % 5;
      newState[newX][newY] = rotateLeft(state[x][y], ROTATION_OFFSETS[x][y]);
    }
  }
  
  return newState;
}

// Função chi (χ)
function chi(state: bigint[][]): bigint[][] {
  const newState: bigint[][] = Array(5).fill(0).map(() => Array(5).fill(0n));
  
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      newState[x][y] = state[x][y] ^ ((~state[(x + 1) % 5][y]) & state[(x + 2) % 5][y]);
    }
  }
  
  return newState;
}

// Função iota (ι)
function iota(state: bigint[][], round: number): bigint[][] {
  const newState = state.map(row => [...row]);
  newState[0][0] ^= ROUND_CONSTANTS[round];
  return newState;
}

// Uma rodada completa do Keccak
function keccakRound(state: bigint[][], round: number): bigint[][] {
  state = theta(state);
  state = rhoPi(state);
  state = chi(state);
  state = iota(state, round);
  return state;
}

// Função de permutação Keccak-f[1600]
function keccakF(state: bigint[][]): bigint[][] {
  for (let round = 0; round < 24; round++) {
    state = keccakRound(state, round);
  }
  return state;
}

// Padding para Keccak (pad10*1)
function pad101(message: Uint8Array, rate: number): Uint8Array {
  const blockSize = rate / 8;
  const paddingLength = blockSize - (message.length % blockSize);
  const padded = new Uint8Array(message.length + paddingLength);
  
  padded.set(message);
  padded[message.length] = 0x01; // Delimitador SHA-3
  padded[padded.length - 1] |= 0x80; // Bit final
  
  return padded;
}

// Absorção (absorb phase)
function absorb(state: bigint[][], message: Uint8Array, rate: number): bigint[][] {
  const blockSize = rate / 8;
  
  for (let i = 0; i < message.length; i += blockSize) {
    for (let j = 0; j < blockSize; j += 8) {
      if (i + j < message.length) {
        const x = Math.floor(j / 8) % 5;
        const y = Math.floor(j / 40);
        const chunk = bytesToBigInt(message, i + j, Math.min(8, message.length - i - j));
        state[x][y] ^= chunk;
      }
    }
    state = keccakF(state);
  }
  
  return state;
}

// Extração (squeeze phase)
function squeeze(state: bigint[][], outputLength: number): Uint8Array {
  const output = new Uint8Array(outputLength);
  let offset = 0;
  
  while (offset < outputLength) {
    for (let y = 0; y < 5 && offset < outputLength; y++) {
      for (let x = 0; x < 5 && offset < outputLength; x++) {
        const bytes = bigIntToBytes(state[x][y], 8);
        const toCopy = Math.min(8, outputLength - offset);
        output.set(bytes.subarray(0, toCopy), offset);
        offset += toCopy;
      }
    }
    if (offset < outputLength) {
      state = keccakF(state);
    }
  }
  
  return output;
}

// Função principal Keccak-256
function keccak256Pure(message: Uint8Array): Uint8Array {
  const rate = 1088; // Para SHA3-256: 1600 - 2*256 = 1088 bits
  const outputLength = 32; // 256 bits = 32 bytes
  
  // Inicializa estado (5x5 de 64-bit lanes)
  let state: bigint[][] = Array(5).fill(0).map(() => Array(5).fill(0n));
  
  // Aplica padding
  const paddedMessage = pad101(message, rate);
  
  // Fase de absorção
  state = absorb(state, paddedMessage, rate);
  
  // Fase de extração
  return squeeze(state, outputLength);
}

// Converte bytes para string hexadecimal
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Função exportada para criptografia Keccak-256 (implementação pura)
export function KeccakEncryptPure(input: string): { 
  encryptedText: string, 
  encryptedNumbers: string,
  algorithm: string 
} {
  const messageBytes = stringToBytes(input);
  const hashBytes = keccak256Pure(messageBytes);
  const hashHex = bytesToHex(hashBytes);
  
  return {
    encryptedText: hashHex,
    encryptedNumbers: Array.from(hashBytes).join(','),
    algorithm: 'Keccak-256 (SHA-3) - Pure Implementation'
  };
}
