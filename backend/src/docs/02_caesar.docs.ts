/**
 * @swagger
 * /api/encrypt/caesarcipher:
 *   post:
 *     tags:
 *       - Cifra de César
 *     summary: Criptografar texto usando Cifra de César
 *     description: |
 *       **Sobre a Cifra de César:**
 *       Uma das técnicas de criptografia mais antigas e simples. Também conhecida como "cifra de deslocamento".
 *       
 *       **Como funciona:**
 *       1. Cada letra do alfabeto é deslocada um número fixo de posições
 *       2. Exemplo: com deslocamento 3, A→D, B→E, C→F, etc.
 *       3. Quando chega ao fim do alfabeto, "dá a volta": X→A, Y→B, Z→C
 *       4. Apenas letras são afetadas, números e símbolos permanecem inalterados
 *       
 *       **Retorno duplo:** números decimais (códigos ASCII) + texto cifrado
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
 *                 description: Texto a ser criptografado (letras, números, símbolos)
 *                 example: "Hello World!"
 *               key:
 *                 type: number
 *                 description: |
 *                   Número de posições para deslocar no alfabeto.
 *                   - Positivo: desloca para frente (A→D com key=3)
 *                   - Negativo: desloca para trás (D→A com key=-3)
 *                   - Zero: sem alteração
 *                 example: 3
 *                 minimum: -25
 *                 maximum: 25
 *     responses:
 *       200:
 *         description: |
 *           **Sucesso:** Texto criptografado usando Cifra de César
 *           
 *           **Retorna dois formatos:**
 *           - `encryptedNumbers`: códigos ASCII dos caracteres cifrados (para descriptografia)
 *           - `encryptedText`: texto cifrado legível
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 encrypted:
 *                   type: object
 *                   properties:
 *                     encryptedNumbers:
 *                       type: string
 *                       description: Códigos ASCII dos caracteres cifrados, separados por vírgula
 *                       example: "75,104,111,111,114,32,87,111,114,108,100,33"
 *                     encryptedText:
 *                       type: string
 *                       description: Texto cifrado legível
 *                       example: "Khoor Zruog!"
 *       400:
 *         description: |
 *           **Erros de validação:**
 *           - Texto vazio ou não fornecido
 *           - Chave não numérica ou não fornecida
 *           - Texto muito longo (limite: 10.000 caracteres)
 *       500:
 *         description: Erro interno durante a criptografia
 *
 * /api/decrypt/caesarcipher:
 *   post:
 *     tags:
 *       - Cifra de César
 *     summary: Descriptografar texto usando Cifra de César
 *     description: |
 *       **Descriptografia da Cifra de César:**
 *       Reverte o processo de criptografia aplicando o deslocamento inverso.
 *       
 *       **Aceita dois formatos de entrada:**
 *       1. **Texto cifrado:** "Khoor" → será convertido automaticamente
 *       2. **Números decimais:** "75,104,111,114" → processado diretamente
 *       
 *       **Processo de descriptografia:**
 *       - Se key=3 foi usado para criptografar, o mesmo 3 é usado para descriptografar
 *       - O algoritmo aplica o deslocamento inverso automaticamente
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
 *                   **Formato flexível:**
 *                   - Texto cifrado: "Khoor Zruog!"
 *                   - Números decimais: "75,104,111,111,114,32,87,111,114,108,100,33"
 *                 example: "Khoor Zruog!"
 *               key:
 *                 type: number
 *                 description: O mesmo número usado na criptografia
 *                 example: 3
 *     responses:
 *       200:
 *         description: |
 *           **Sucesso:** Texto descriptografado
 *           
 *           **Retorna:**
 *           - `decryptedText`: texto original recuperado
 *           - `decryptedNumbers`: códigos ASCII do texto original
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 decrypted:
 *                   type: object
 *                   properties:
 *                     decryptedText:
 *                       type: string
 *                       description: Texto original descriptografado
 *                       example: "Hello World!"
 *                     decryptedNumbers:
 *                       type: string
 *                       description: Códigos ASCII do texto original
 *                       example: "72,101,108,108,111,32,87,111,114,108,100,33"
 *       400:
 *         description: Erro de validação nos dados de entrada
 *       500:
 *         description: Erro interno durante a descriptografia
 */