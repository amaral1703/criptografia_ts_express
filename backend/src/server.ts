import express, { Request, Response } from 'express';
import { OneTimePadEncrypt } from './encrypter';
import { OneTimePadDecrypt } from './decrypter';
import { caesarValidateDecryptionInput, otpValidateDecryptionInput } from './helpers/input-validator/Decrypt';
import { caesarValidateEncryptionInput, otpValidateEncryptionInput } from './helpers/input-validator/Encrypt';
import { CaesarCipherEncrypt } from './encrypter/caesarcypher-encrypter';
import { CaesarCipherDecrypt } from './decrypter/caesarcypher-decrypter';
import { normalizeCaesarInput } from './helpers/text';

const app = express ();
const port = 3000;
app.use(express.json())

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
    const text_normalized = normalizeCaesarInput(text)
    const decrypted = CaesarCipherDecrypt( text_normalized, key );
    console.log(decrypted)
    res.json({ decrypted })
  } catch (error) {
    console.error('Erro na criptografia da cifra de cesar:', error)
    res.status(500).json({ error: 'Erro interno na criptografia da cifra de cesar'})
  }
})


app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})