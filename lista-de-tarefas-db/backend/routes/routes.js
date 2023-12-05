// importo o modulo do express para poder ter acesso a classe de gerenciamento das rotas
const express = require('express');
// Importo a classe Sequelize para ser ultilizado no projeto
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../sequelizeConfig');

// inicializo a classe do sequelize;
const sequelize = new Sequelize(config.development);

//inicializo as rotas do express atribuindo a variavel router;
const router = express.Router();

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})


router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.send(tasks);
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);
  res.send(task);
})

router.post('/add', async (req,res) => {
  const task = req.body;
  const newTask = {
    id: crypto.randomUUID(),
    ...task
  }
  const response = await Task.create(newTask);
  res.send(response);
})

router.put('/update/:id', async (req,res) => {
  const id = req.params.id;
  const updatedTask = req.body;

  const result = await Task.update(updatedTask, {
    where: { id },
    returning: true
  })
  console.log(result);
  res.send(result);
})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  const response = await Task.destroy({ where: { id } });
  res.status(200).json({data: response});
})



// exporto as rotas para serem usadas no index.js
module.exports = router;