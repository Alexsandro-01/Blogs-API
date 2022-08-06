const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './src/routes/login.js',
  './src/routes/user.js',
  './src/routes/blogPost.js',
  './src/routes/category.js'
]

swaggerAutogen(outputFile, endpointsFiles)