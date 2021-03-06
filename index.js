require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRoute = require('./Routes/productsRoute');
const salesRoute = require('./Routes/salesRoute');
const middlewareError = require('./middlewares/errorMiddleware');

const app = express();

app.use(bodyParser.json());
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use(middlewareError);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
