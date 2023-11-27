const express = require('express');

// inicializa as rotas do express
const router = express.Router();


const products = [
  {
    id: 1,
    name: 'Playstation 5',
    category: 'Eletronicos',
    price: 'R$4000'
  },
  {
    id: 2,
    name: 'Nitendo wii',
    category: 'Eletronicos',
    price: 'R$2000'
  },
  {
    id: 3,
    name: 'Geladeira',
    category: 'Eletrodomesticos',
    price: 'R$2500'
  }
]


// [GET] - Rota que lista todos os produtos
router.get('/', (req, res) => {
  res.send(products);
})


// exportamos o router para ser usado no index
module.exports = router;