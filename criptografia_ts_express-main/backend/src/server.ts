import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import { OneTimePadEncrypt, CaesarCipherEncrypt, VigenereEncrypt, HillEncrypt, KeccakEncryptPure, KeccakEncryptLib } from './encrypter';
import { OneTimePadDecrypt, CaesarCipherDecrypt, VigenereDecrypt, HillDecrypt } from './decrypter';
import { caesarValidateDecryptionInput, hillValidateDecryptionInput, otpValidateDecryptionInput, vigenereValidateDecryptionInput } from './helpers/input-validator/Decrypt';
import { caesarValidateEncryptionInput, hillValidateEncryptionInput, otpValidateEncryptionInput, vigenereValidateEncryptionInput, keccakValidateEncryptionInput } from './helpers/input-validator/Encrypt';
import { normalizeDecryptTextInput } from './helpers/text';

const app = express ();
const port = 3000;
app.use(cors({ 
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST']
}));
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API de Criptografia",
  customfavIcon: "/assets/favicon.ico"
}));

app.post('/api/encrypt/otp', (req: Request, res: Response) => {
  const { text, key } = req.body;
  const validation = otpValidateEncryptionInput(text, key);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error })
  }
  try {
    const encrypted = OneTimePadEncrypt(text, key);
    console.log(encrypted)
    res.json({ encrypted })
  } catch (error) {
    console.error('Erro na criptografia do OTP:', error)
    res.status(500).json({ error: 'Erro interno na cryptografia'})
  }
})

app.post('/api/decrypt/otp', (req: Request, res: Response) => {
  const { text, key } = req.body;
  const validation = otpValidateDecryptionInput(text, key);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error })
  }
  try {

    const decrypted = OneTimePadDecrypt(text, key);
    console.log(decrypted)
    res.json({ decrypted })
  } catch (error) {
    console.error('Erro na descriptografia do OTP:', error)
    res.status(500).json({ error: 'Erro interno na descriptografia'})
  }
})

app.post('/api/encrypt/caesarcipher', (req: Request, res: Response) => {
  const { text, key } = req.body;
  const validation = caesarValidateEncryptionInput(text, key);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error })
  }
  try {
    const encrypted = CaesarCipherEncrypt( text, key );
    console.log(encrypted)
    res.json({ encrypted })
  } catch (error) {
    console.error('Erro na criptografia da cifra de cesar:', error)
    res.status(500).json({ error: 'Erro interno na criptografia da cifra de cesar'})
  }
})

app.post('/api/decrypt/caesarcipher', (req: Request, res: Response) => {
  const { text, key } = req.body;
  const validation = caesarValidateDecryptionInput(text, key);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error })
  }
  try {
    const text_normalized = normalizeDecryptTextInput(text)
    const decrypted = CaesarCipherDecrypt( text_normalized, key );
    console.log(decrypted)
    res.json({ decrypted })
  } catch (error) {
    console.error('Erro na criptografia da cifra de cesar:', error)
    res.status(500).json({ error: 'Erro interno na criptografia da cifra de cesar'})
  }
})

app.post('/api/encrypt/vigenere', (req: Request, res: Response) => {
  const { text, key } = req.body;
  const validation = vigenereValidateEncryptionInput(text , key);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error})
  }
  try {
    const encrypted = VigenereEncrypt( text, key );
    console.log(encrypted)
    res.json({ encrypted })
  } catch (error) {
    console.error('Erro na criptografia da cifra vigenere:', error)
    res.status(500).json({ error: 'Erro interno na criptografia da cifra vigenere'})
  }
})

app.post('/api/decrypt/vigenere', (req: Request, res: Response) => {
  const { text, key } = req.body;
  const validation = vigenereValidateDecryptionInput(text , key);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error})
  }
  try {
    const text_normalized = normalizeDecryptTextInput(text)
    const decrypted = VigenereDecrypt( text_normalized, key );
    console.log(decrypted)
    res.json({ decrypted })
  } catch (error) {
    console.error('Erro na criptografia da cifra vigenere:', error)
    res.status(500).json({ error: 'Erro interno na criptografia da cifra vigenere'})
  }
})

app.post('/api/encrypt/hill', (req: Request, res: Response) => {
  const { text, key } = req.body;
  const validation = hillValidateEncryptionInput(text, key);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  try {
    const encrypted = HillEncrypt( text, key );
    console.log(encrypted)
    res.json({ encrypted })
  } catch (error) {
    console.error('Erro na criptografia da cifra vigenere:', error)
    res.status(500).json({ error: 'Erro interno na criptografia da cifra vigenere'})
  }
})

app.post('/api/decrypt/hill', (req: Request, res: Response) => {
  const { text, key } = req.body;
   const validation = hillValidateDecryptionInput(text, key);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  try {
    const text_normalized = normalizeDecryptTextInput(text)
    const decrypted = HillDecrypt( text_normalized, key );
    console.log(decrypted)
    res.json({ decrypted })
  } catch (error) {
    console.error('Erro na descriptografia da cifra de hill:', error)
    res.status(500).json({ error: 'Erro interno na descriptografia da cifra de hill'})
  }
})




// Rota para hash Keccak-256 (SHA-3)
app.post('/api/hash/keccak', (req: Request, res: Response) => {
  const { text, implementation } = req.body;
  const validation = keccakValidateEncryptionInput(text, implementation);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error })
  }
  try {
    let hash;
    if (implementation.toLowerCase() === 'pure') {
      hash = KeccakEncryptPure(text);
    } else {
      hash = KeccakEncryptLib(text);
    }
    console.log(hash)
    res.json({ hash })
  } catch (error) {
    console.error('Erro ao gerar hash Keccak:', error)
    res.status(500).json({ error: 'Erro interno ao gerar hash'})
  }
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})