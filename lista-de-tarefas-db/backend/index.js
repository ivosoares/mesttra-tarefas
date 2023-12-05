// importo o express (modulo para gerenciamento da aplicacao web)
const express = require('express');
// importo o arquivo de rotas;
const taskRouter = require('./routes/routes');

// iniclizo o express na minha aplicacao
const app = express();

//midleware para o express trabalhar com json
app.use(express.json());

//declaro minha rota raiz e vinculo com o arquivo de rotas
app.use('/tasks', taskRouter);

// defino e exponho a porta do projeto
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
})