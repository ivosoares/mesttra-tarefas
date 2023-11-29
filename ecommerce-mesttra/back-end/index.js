// MESTRA ECOMMERCE

//importamos o express
const express = require('express');
const cors = require('cors');
// importo as rotas da aplicacao;
const productRouter = require('./routes/routes');

// inicializo a minha instancia do express;
const app = express();


app.use(cors());
// habilito o midleware de json do express;
app.use(express.json());

// inicializa a rota /products de acordo com as configuracoes do meu arquivo de rotas;
app.use('/products', productRouter);


//configuro a minha primeira rota (boas vindas);
app.get('/', (req, res) => {
  setTimeout(() => {
    res.send('ola galera');
  }, 5000);
})


//configuro a porta do nosso projeto e a sua exposicao.
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
})