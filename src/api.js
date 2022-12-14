const express = require('express');
require('express-async-errors');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

const errorMiddleware = require('./middlewares/errorMiddleware');
const authRoute = require('./routes/login');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const blogPostRoute = require('./routes/blogPost');

// ...

const app = express();

app.use(express.json());
app.use('/', authRoute);
app.use('/', userRoute);
app.use('/', categoryRoute);
app.use('/', blogPostRoute);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(errorMiddleware);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
