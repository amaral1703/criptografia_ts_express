/**
 * @swagger
 * /api/encrypt/caesarcipher:
 *   post:
 *     tags:
 *       - Cifra de César
 *     summary: Criptografar texto usando Cifra de César
 *     description: Criptografa um texto usando o algoritmo de Cifra de César com deslocamento numérico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ['text', 'key']
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texto a ser criptografado
 *               key:
 *                 type: number
 *                 description: Número de deslocamento no alfabeto
 *           example:
 *             text: "Hello"
 *             key: 3
 *     responses:
 *       200:
 *         description: Texto criptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EncryptResponse'
 *             example:
 *               encrypted:
 *                 encryptedNumbers: "75,104,111,111,114"
 *                 encryptedText: "Khoor"
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 *
 * /api/decrypt/caesarcipher:
 *   post:
 *     tags:
 *       - Cifra de César
 *     summary: Descriptografar texto usando Cifra de César
 *     description: Descriptografa um texto usando Cifra de César. Aceita tanto texto cifrado quanto números decimais.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ['text', 'key']
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texto cifrado ou números decimais separados por vírgula
 *               key:
 *                 type: number
 *                 description: Número de deslocamento usado na criptografia
 *           example:
 *             text: "Khoor"
 *             key: 3
 *     responses:
 *       200:
 *         description: Texto descriptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DecryptResponse'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */