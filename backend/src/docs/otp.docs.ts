/**
 * @swagger
 * /api/encrypt/otp:
 *   post:
 *     tags:
 *       - One-Time Pad (OTP)
 *     summary: Criptografar texto usando One-Time Pad
 *     description: Criptografa um texto usando o algoritmo One-Time Pad com uma chave fornecida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EncryptRequest'
 *           example:
 *             text: "Hello World"
 *             key: "mysecretkey"
 *     responses:
 *       200:
 *         description: Texto criptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 encrypted:
 *                   type: string
 *                   description: Números decimais separados por vírgula
 *             example:
 *               encrypted: "33,26,47,47,50,63,23,50,59,47,29"
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *
 * /api/decrypt/otp:
 *   post:
 *     tags:
 *       - One-Time Pad (OTP)
 *     summary: Descriptografar texto usando One-Time Pad
 *     description: Descriptografa um texto usando o algoritmo One-Time Pad com uma chave fornecida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DecryptRequest'
 *           example:
 *             text: "33,26,47,47,50,63,23,50,59,47,29"
 *             key: "mysecretkey"
 *     responses:
 *       200:
 *         description: Texto descriptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 decrypted:
 *                   type: string
 *             example:
 *               decrypted: "Hello World"
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */