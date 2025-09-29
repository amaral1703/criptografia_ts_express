import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Criptografia',
    version: '1.0.0',
    description: 'API para algoritmos de criptografia clássicos: OTP, Cifra de César, Vigenère e Hill',
    contact: {
      name: 'Seu Nome',
      email: 'seu.email@example.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor (api backendd)'
    }
  ],
  components: {
    schemas: {
      EncryptRequest: {
        type: 'object',
        required: ['text', 'key'],
        properties: {
          text: {
            type: 'string',
            description: 'Texto a ser criptografado'
          },
          key: {
            type: 'string',
            description: 'Chave para criptografia'
          }
        }
      },
      DecryptRequest: {
        type: 'object',
        required: ['text', 'key'],
        properties: {
          text: {
            type: 'string',
            description: 'Texto criptografado ou números decimais separados por vírgula'
          },
          key: {
            type: 'string',
            description: 'Chave para descriptografia'
          }
        }
      },
      EncryptResponse: {
        type: 'object',
        properties: {
          encrypted: {
            type: 'object',
            properties: {
              encryptedNumbers: {
                type: 'string',
                description: 'Texto criptografado em números decimais'
              },
              encryptedText: {
                type: 'string',
                description: 'Texto criptografado'
              }
            }
          }
        }
      },
      DecryptResponse: {
        type: 'object',
        properties: {
          decrypted: {
            type: 'object',
            properties: {
              decryptedText: {
                type: 'string',
                description: 'Texto descriptografado'
              },
              decryptedNumbers: {
                type: 'string',
                description: 'Códigos decimais do texto original'
              }
            }
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Mensagem de erro'
          }
        }
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/**/*.ts'], // Caminho para os arquivos com anotações JSDoc
};

export const specs = swaggerJsdoc(options);