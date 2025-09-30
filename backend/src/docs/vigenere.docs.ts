/**
 * @swagger
 * /api/encrypt/vigenere:
 *   post:
 *     tags:
 *       - Cifra de Vigenère
 *     summary: Criptografar texto usando Cifra de Vigenère
 *     description: Criptografa um texto usando a Cifra de Vigenère. Requer mensagem com mínimo 4 palavras.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EncryptRequest'
 *           example:
 *             text: "Hello World this is a test"
 *             key: "KEY"
 *     responses:
 *       200:
 *         description: Texto criptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EncryptResponse'
 *       400:
 *         description: Erro de validação - mensagem deve ter pelo menos 4 palavras
 *       500:
 *         description: Erro interno do servidor
 *
 * /api/decrypt/vigenere:
 *   post:
 *     tags:
 *       - Cifra de Vigenère
 *     summary: Descriptografar texto usando Cifra de Vigenère
 *     description: Descriptografa um texto usando a Cifra de Vigenère
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DecryptRequest'
 *           example:
 *             text: "82,105,115,115,121,32,87,111,114,108,100"
 *             key: "KEY"
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