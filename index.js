require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRoute = require('./middlewares/productsRoute');
const salesRoute = require('./middlewares/salesRoute');

const app = express();

app.use(bodyParser.json());
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
