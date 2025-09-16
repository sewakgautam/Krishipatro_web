import swaggerJSDoc from 'swagger-jsdoc'

export const getApiDocs = async () => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Krishi Patro API',
        version: '1.0.0',
        description: 'API documentation for Krishi Patro',
      },
      servers: [
        {
          url: 'https://api.krishipatro.com/api',
        },
      ],
    },
    apis: ['src/pages/api/**/*.ts', 'src/lib/schemas/**/*.ts'],
  }
  const spec = swaggerJSDoc(options)
  return spec
}
