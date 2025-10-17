/**
 * @swagger
 * /api/encrypt/vigenere:
 *   post:
 *     tags:
 *       - Cifra de Vigenère
 *     summary: Criptografar texto usando Cifra de Vigenère
 *     description: |
 *       **Sobre a Cifra de Vigenère:**
 *       Desenvolvida por Giovan Battista Bellaso, atribuída erroneamente a Blaise de Vigenère.
 *       É uma evolução da Cifra de César que usa uma chave variável.
 *       
 *       **Como funciona:**
 *       1. A chave é repetida até cobrir todo o texto
 *       2. Cada letra do texto é deslocada pela letra correspondente da chave
 *       3. Exemplo: "HELLO" + chave "KEY" → H+K, E+E, L+Y, L+K, O+E
 *       4. É mais segura que César por usar deslocamentos variáveis
 *       
 *       **Requisito especial:** mensagem deve ter pelo menos 4 palavras
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
 *                 description: |
 *                   **Texto a ser criptografado**
 *                   
 *                   **Requisito:** mínimo de 4 palavras
 *                   - ✅ Válido: "Esta é uma mensagem secreta"
 *                   - ❌ Inválido: "Oi mundo"
 *                 example: "Hello World this is a secret message"
 *               key:
 *                 type: string
 *                 description: |
 *                   **Chave de criptografia**
 *                   
 *                   Pode ser uma palavra ou frase. Será repetida automaticamente
 *                   para cobrir todo o texto.
 *                 example: "SECRETKEY"
 *     responses:
 *       200:
 *         description: |
 *           **Sucesso:** Texto criptografado com Vigenère
 *           
 *           **Retorno duplo:**
 *           - Números decimais (para descriptografia precisa)
 *           - Texto cifrado (para visualização)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EncryptResponse'
 *             example:
 *               encrypted:
 *                 encryptedNumbers: "90,111,118,118,121,32,87,111,114,108,100"
 *                 encryptedText: "Zovvy Wruog"
 *       400:
 *         description: |
 *           **Erros específicos da Vigenère:**
 *           - Mensagem com menos de 4 palavras
 *           - Chave vazia ou não fornecida
 *           - Texto muito longo (limite: 10.000 caracteres)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "A mensagem deve conter no mínimo quatro palavras"
 *       500:
 *         description: Erro interno do servidor durante a criptografia
 *
 * /api/decrypt/vigenere:
 *   post:
 *     tags:
 *       - Cifra de Vigenère
 *     summary: Descriptografar texto usando Cifra de Vigenère
 *     description: |
 *       **Descriptografia da Vigenère:**
 *       Processo inverso da criptografia, aplicando deslocamentos reversos.
 *       
 *       **Importante:** Use exatamente a mesma chave da criptografia
 *       
 *       **Aceita:** números decimais ou texto cifrado (conversão automática)
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
 *                 description: |
 *                   **Texto criptografado**
 *                   
 *                   Formatos aceitos:
 *                   - Texto cifrado: "Zovvy Wruog"  
 *                   - Números decimais: "90,111,118,118,121,32,87,111,114,108,100"
 *                 example: "90,111,118,118,121,32,87,111,114,108,100"
 *               key:
 *                 type: string
 *                 description: A mesma chave usada na criptografia
 *                 example: "SECRETKEY"
 *     responses:
 *       200:
 *         description: Texto descriptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DecryptResponse'
 *             example:
 *               decrypted:
 *                 decryptedText: "Hello World this is a secret message"
 *                 decryptedNumbers: "72,101,108,108,111,32,87,111,114,108,100"
 *       400:
 *         description: Erro de validação - chave incorreta ou formato inválido
 *       500:
 *         description: Erro interno durante a descriptografia
 */