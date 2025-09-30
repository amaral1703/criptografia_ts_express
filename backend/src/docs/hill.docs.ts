/**
 * @swagger
 * /api/encrypt/hill:
 *   post:
 *     tags:
 *       - Cifra de Hill
 *     summary: Criptografar texto usando Cifra de Hill
 *     description: |
 *       Criptografia usando matriz 2x2. 
 *       
 *       **Requisitos:**
 *       - A chave deve ter 4 letras
 *       - A chave deve gerar uma matriz invertível módulo 26
 *       
 *       **Exemplos de chaves válidas:** HILL, GYBN, DEED
 *       
 *       **Exemplos de chaves inválidas:** AAAA, ABAB, NOON
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EncryptRequest'
 *           example:
 *             text: "HELLO"
 *             key: "HILL"
 *     responses:
 *       200:
 *         description: Texto criptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EncryptResponse'
 *       400:
 *         description: |
 *           Erro de validação:
 *           - Chave inválida (não gera matriz invertível módulo 26)
 *           - Texto ou chave vazios
 *       500:
 *         description: Erro interno do servidor
 *
 * /api/decrypt/hill:
 *   post:
 *     tags:
 *       - Cifra de Hill
 *     summary: Descriptografar texto usando Cifra de Hill
 *     description: Descriptografa um texto usando a Cifra de Hill (matriz 2x2)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DecryptRequest'
 *           example:
 *             text: "11,4,11,4,25"
 *             key: "HILL"
 *     responses:
 *       200:
 *         description: Texto descriptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DecryptResponse'
 *       400:
 *         description: Erro de validação - chave inválida
 *       500:
 *         description: Erro interno do servidor
 */