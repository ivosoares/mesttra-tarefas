const express = require('express');
const crypto = require('crypto');
// importo o dbConfig.
const pool = require('./../dbConfig');


// inicializa as rotas do express
const router = express.Router();


const products = []


// [GET] - Rota que lista todos os produtos
router.get('/', async (req, res) => {
  try {
    const productsDB = await pool.query('SELECT * FROM products');
    res.send(productsDB.rows);
  } catch (error) {
    console.error('Erro ao buscar o produto', error);
    res.status(500).json({
      message: 'Erro durante a busca',
      data: error
    })
  }
})

// [GET] - Rota que retorna um produto por id
router.get('/:id', async (req, res) => {
  // recebo o id via req params
  const id = req.params.id;
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id])
    // verifico se existe o produto, se nao existir devolvo um 404 com a mensagem "Produto nao encontrado"
    if(rows.length === 0) {
      res.status(404).send('Produto nao encontrado');
    } else {
      // se encontrar o produto devolve o produto
      res.send(rows);
    }
  } catch (error) {
    console.error('Erro ao buscar o produto', error);
    res.status(500).json({
      message: 'Erro durante a busca',
      data: error
    })
  }

})

// CRUD (CREATE - POST)(READ - GET)(UPDATE - PUT)(DELETE - DELETE)

// [POST] - Cadastra um novo produto
router.post('/add', async (req, res) => {
  const product = req.body;


  if(!product.name || !product.category || !product.price) {
    res.status(400).send('Está faltando os dados do produto');
    return;
  } 
  
  const { rows } = await pool.query('INSERT INTO products (id, name, category, price) VALUES ($1, $2, $3, $4) RETURNING *', 
    [crypto.randomUUID(), product.name, product.category, product.price]
  )

  res.status(201).json({
    status: 'Produto cadastrado com sucesso',
    data: rows
  });
})

// [DELETE] - Exclui um produto
router.delete('/delete/:id', async (req, res) => {
  //acesso o id via parametro
  const id = req.params.id;

  const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

  res.json({
    message: 'Produto Excluido com sucesso',
    data: rows
  })
})


// [PUT] - Atualiza um produto pre cadastrado
router.put('/edit/:id', async(req, res) => {
  // recebo o id via param
  const id = req.params.id;
  // recebo o objeto com os dados atualizados do produto
  const editProduct = req.body;

  const { rows } = await pool.query('UPDATE products SET name = $1, category = $2, price = $3 WHERE id = $4 RETURNING *', 
    [editProduct.name, editProduct.category, editProduct.price, id]
  )

  res.json({
    message: 'Produto Editado com sucesso',
    data: rows
  });

})


// exportamos o router para ser usado no index
module.exports = router;