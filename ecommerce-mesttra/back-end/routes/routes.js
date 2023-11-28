const express = require('express');
const crypto = require('crypto');

// inicializa as rotas do express
const router = express.Router();


const products = []


// [GET] - Rota que lista todos os produtos
router.get('/', (req, res) => {
  res.send(products);
})

// [GET] - Rota que retorna um produto por id
router.get('/:id', (req, res) => {
  // recebo o id via req params
  const id = req.params.id;
  // procuro o produto que contem o id igual ao recebido pelo parametro
  const product = products.find(product => product.id == id);
  // verifico se existe o produto, se nao existir devolvo um 404 com a mensagem "Produto nao encontrado"
  if(!product) {
    res.status(404).send('Produto nao encontrado');
  }
  // se encontrar o produto devolve o produto
  res.send(product);
})

// CRUD (CREATE - POST)(READ - GET)(UPDATE - PUT)(DELETE - DELETE)

// [POST] - Cadastra um novo produto
router.post('/add', (req, res) => {
  const product = req.body;
  const newProduct = {
    id: crypto.randomUUID(),
    ...product
  }

  if(!product.name || !product.category || !product.price) {
    res.status(400).send('Está faltando os dados do produto');
  }

  products.push(newProduct);
  res.status(201).send('Produto cadastrado com sucesso');
})

// [DELETE] - Exclui um produto
router.delete('/delete/:id', (req, res) => {
  //acesso o id via parametro
  const id = req.params.id;
  //procuro em qual posicao está o produto pelo seu id
  const index = products.findIndex(product => product.id == id);
  products.splice(index, 1);
  res.send('Produto excluido com sucesso!')
})


// [PUT] - Atualiza um produto pre cadastrado
router.put('/edit/:id', (req, res) => {
  // recebo o id via param
  const id = req.params.id;

  // recebo o objeto com os dados atualizados do produto
  const editProduct = req.body;

  // Procuro em qual posicao esta o produto pelo seu id;
  const index = products.findIndex(product => product.id == id);

  products[index] = {
    ...products[index],
    ...editProduct
  }

  console.log(products[index]);

  res.send('Produto atualizado com sucesso');

})


// exportamos o router para ser usado no index
module.exports = router;