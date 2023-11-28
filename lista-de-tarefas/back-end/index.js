// API (Application Program Interface)
// importamos o express
const express = require('express');
const crypto = require('crypto');
// importo o modulo de cors
const cors = require('cors');

// inicializa um servidor web com express
const app = express();

// fala pro express ultilizar o middleware para trabalharmos com json
app.use(express.json());

// uso o middleware para remover o problema de cors
app.use(cors());

// Criar uma lista de tarefas pre cadastrada
const tarefas = [
  {
    id: crypto.randomUUID(), 
    text: 'Ir ao mercado',
    prazo: '2 dias'
  },
  {
    id: crypto.randomUUID(), 
    text: 'Estudar sobre git',
    prazo: '3 dias'
  },
  {
    id: crypto.randomUUID(), 
    text: 'Estudar Javascript',
    prazo: '10 dias'
  },
  {
    id: crypto.randomUUID(), 
    text: 'Estudar Desenvolvimento de Jogos',
    prazo: '20 dias'
  }
]


// REST - POST / GET / PUT / DELETE
// CRUD - CREATE / READ / UPDATE / DELETE
app.get('/', (req, res) => {
  res.send('Olá Galera!');
})

// Rota que lista todas as tarefas pré cadastradas
app.get('/tarefas', (req, res) => {
  res.send(tarefas);
})

// Rota que busca por uma tarefa especifica
app.get('/tarefas/:id', (req, res) => {
  //acessar o parametro da URL
  const idParam = req.params.id;

  // buscar o item na lista de acordo com o seu ID
  const tarefa = tarefas.find((tarefa) => tarefa.id == idParam);

  // retorna a tarefa unica pelo o seu id
  res.send(tarefa);
})


// defino uma porta de rede para rodar o meu sevidor web
const port = 3000;

// inicializamos o servidor na porta pre definida
app.listen(port, () => {
  console.log('O app esta rodando na porta 3000')
})