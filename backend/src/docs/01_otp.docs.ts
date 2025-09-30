/**
 * @swagger
 * /api/encrypt/otp:
 *   post:
 *     tags:
 *       - One-Time Pad (OTP)
 *     summary: Criptografar texto usando algoritmo One-Time Pad
 *     description: |
 *       **Sobre o One-Time Pad:**
 *       O One-Time Pad é um algoritmo de criptografia baseado na operação XOR (OU exclusivo).
 *       É considerado teoricamente inquebrável quando usado corretamente.
 *       
 *       **Como funciona:**
 *       1. Cada caractere do texto é convertido para seu valor ASCII
 *       2. Aplica-se XOR entre o valor do texto e o valor da chave (repetida se necessário)
 *       3. O resultado é retornado como números decimais separados por vírgula
 *       
 *       **Exemplo:** "ABC" com chave "123" → cada letra é XOR com a chave correspondente
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
 *         description: |
 *           **Sucesso:** Texto criptografado com algoritmo OTP
 *           
 *           Retorna uma string com números decimais separados por vírgula.
 *           Cada número representa o valor ASCII criptografado de um caractere.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 encrypted:
 *                   type: string
 *                   description: Números decimais separados por vírgula (valores ASCII criptografados)
 *                   example: "33,26,47,47,50,63,23,50,59,47,29"
 *       400:
 *         description: |
 *           **Erro de Validação:**
 *           - Texto ou chave não fornecidos
 *           - Texto ou chave vazios
 *           - Tipos de dados incorretos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Texto e chave são obrigatórios"
 *       500:
 *         description: Erro interno do servidor durante a criptografia
 *
 * /api/decrypt/otp:
 *   post:
 *     tags:
 *       - One-Time Pad (OTP)
 *     summary: Descriptografar texto usando algoritmo One-Time Pad
 *     description: |
 *       **Descriptografia OTP:**
 *       Reverte o processo de criptografia aplicando novamente a operação XOR.
 *       
 *       **Entrada esperada:** 
 *       - String de números decimais separados por vírgula (resultado da criptografia)
 *       - A mesma chave usada na criptografia
 *       
 *       **Processo:**
 *       1. Converte a string de números em array de inteiros
 *       2. Aplica XOR novamente com a chave (XOR é reversível: A XOR B XOR B = A)
 *       3. Converte os valores resultantes de volta para caracteres
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
 *                 description: String de números decimais separados por vírgula (resultado da criptografia OTP)
 *                 example: "33,26,47,47,50,63,23,50,59,47,29"
 *               key:
 *                 type: string
 *                 description: A mesma chave utilizada na criptografia
 *                 example: "mysecretkey"
 *     responses:
 *       200:
 *         description: Texto descriptografado com sucesso, retornando o texto original
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 decrypted:
 *                   type: string
 *                   description: Texto original descriptografado
 *                   example: "Hello World"
 *       400:
 *         description: |
 *           **Erros possíveis:**
 *           - Formato inválido (deve ser números decimais separados por vírgula)
 *           - Chave não fornecida ou vazia
 *       500:
 *         description: Erro interno durante a descriptografia
 */