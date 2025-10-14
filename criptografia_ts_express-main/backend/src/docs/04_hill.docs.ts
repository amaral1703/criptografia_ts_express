/**
 * @swagger
 * /api/encrypt/hill:
 *   post:
 *     tags:
 *       - Cifra de Hill
 *     summary: Criptografar texto usando Cifra de Hill (matriz 2x2)
 *     description: |
 *       **Sobre a Cifra de Hill:**
 *       Baseada em álgebra linear e conceitos de matriz inversa. Desenvolvida por Lester S. Hill em 1929.
 *       É uma cifra de substituição polialfabética que opera em blocos de caracteres.
 *       
 *       **Como funciona:**
 *       1. Converte texto em números (A=0, B=1, ..., Z=25)
 *       2. Cria matriz 2x2 a partir da chave (4 letras)
 *       3. Multiplica pares de números do texto pela matriz
 *       4. Aplica módulo 26 aos resultados
 *       5. Converte de volta para letras
 *       
 *       **Requisitos críticos da chave:**
 *       - Exatamente 4 letras (completa com 'X' se necessário)
 *       - Deve gerar matriz invertível módulo 26
 *       - Determinante da matriz deve ser coprimo de 26
 *       
 *       **⚠️ Chaves inválidas causam erro na descriptografia**
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
 *                   - Apenas letras são processadas (A-Z, a-z)
 *                   - Outros caracteres são ignorados
 *                   - Tamanho ímpar recebe padding 'X' automaticamente
 *                 example: "HELLO"
 *               key:
 *                 type: string
 *                 description: |
 *                   **Chave de 4 letras para formar matriz 2x2**
 *                   
 *                   **✅ Exemplos válidos:**
 *                   - "HILL" (clássico)
 *                   - "DEED" 
 *                   - "GYBN"
 *                   
 *                   **❌ Exemplos inválidos:**
 *                   - "AAAA" (determinante = 0)
 *                   - "ABAB" (não invertível)
 *                   - "NOON" (determinante par)
 *                 example: "HILL"
 *                 minLength: 1
 *                 maxLength: 1000
 *     responses:
 *       200:
 *         description: |
 *           **Sucesso:** Texto criptografado com Cifra de Hill
 *           
 *           **Resultado:**
 *           - `encryptedNumbers`: códigos decimais (necessário para descriptografia)
 *           - `encryptedText`: texto cifrado legível
 *           
 *           **Exemplo:** "HELLO" → "APADJ"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EncryptResponse'
 *             example:
 *               encrypted:
 *                 encryptedNumbers: "0,15,0,3,9"
 *                 encryptedText: "APADJ"
 *       400:
 *         description: |
 *           **Erros específicos da Hill:**
 *           
 *           **Mais comum:** "A chave não gera uma matriz invertível módulo 26"
 *           
 *           **Outros erros:**
 *           - Texto ou chave vazios
 *           - Texto muito longo (>10.000 caracteres)
 *           - Chave muito longa (>1.000 caracteres)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalid_matrix:
 *                 summary: Matriz não invertível
 *                 value:
 *                   error: "A chave não gera uma matriz invertível módulo 26. Escolha outra chave com letras diferentes."
 *               empty_input:
 *                 summary: Entrada vazia
 *                 value:
 *                   error: "Texto e chave não podem estar vazios"
 *       500:
 *         description: Erro interno durante os cálculos matriciais
 *
 * /api/decrypt/hill:
 *   post:
 *     tags:
 *       - Cifra de Hill
 *     summary: Descriptografar texto usando Cifra de Hill (matriz 2x2)
 *     description: |
 *       **Descriptografia da Hill:**
 *       Processo matemático complexo que usa a matriz inversa da chave.
 *       
 *       **Processo interno:**
 *       1. Cria matriz 2x2 da chave
 *       2. Calcula matriz inversa módulo 26
 *       3. Multiplica números cifrados pela matriz inversa
 *       4. Converte resultados de volta para texto
 *       
 *       **⚠️ Importante:** 
 *       - Use exatamente a mesma chave da criptografia
 *       - A chave deve continuar sendo válida (matriz invertível)
 *       
 *       **Entrada:** números decimais separados por vírgula (resultado da criptografia)
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
 *                   **String de números decimais**
 *                   
 *                   Deve ser exatamente o resultado `encryptedNumbers` da criptografia.
 *                   Formato: números inteiros separados por vírgula.
 *                 example: "0,15,0,3,9"
 *                 pattern: "^(\\d+)(,\\d+)*$"
 *               key:
 *                 type: string
 *                 description: |
 *                   **A mesma chave usada na criptografia**
 *                   
 *                   Deve gerar a mesma matriz invertível de 2x2.
 *                 example: "HILL"
 *     responses:
 *       200:
 *         description: |
 *           **Sucesso:** Texto descriptografado usando matriz inversa
 *           
 *           **Retorna:**
 *           - `decryptedText`: texto original recuperado
 *           - `decryptedNumbers`: códigos ASCII do texto original
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DecryptResponse'
 *             example:
 *               decrypted:
 *                 decryptedText: "HELLO"
 *                 decryptedNumbers: "7,4,11,11,14"
 *       400:
 *         description: |
 *           **Erros na descriptografia:**
 *           - Chave inválida (não gera matriz invertível)
 *           - Formato incorreto dos números decimais
 *           - Chave diferente da usada na criptografia
 *       500:
 *         description: |
 *           **Erro interno:** 
 *           Falha nos cálculos matriciais ou na inversão da matriz.
 *           Geralmente indica problema com a chave ou dados corrompidos.
 */