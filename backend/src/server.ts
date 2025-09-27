import express, { Request, Response } from 'express';
import { OneTimePadEncrypt } from './encrypter';
import { OneTimePadDecrypt } from './decrypter';
import { otpValidateDecryptionInput } from './helpers/input-validator/Decrypt';
import { otpValidateEncryptionInput } from './helpers/input-validator/Encrypt';

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
    res.status(500).json({ error: 'Erro interno na cyptografia'})
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

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})