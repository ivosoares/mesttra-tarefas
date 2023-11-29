// Importo o Pool do postgress-node
const { Pool } = require('pg');

// inicio a minha classe de configuracao do pool de conexao
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommercemesttra',
  password: 'root',
  port: 5432
});

// const teste = async() => {
//   const result = await pool.query('SELECT * FROM products');
//   console.log(result.rows[0]);
// }
// teste();

//exporto a minha constante pool
module.exports = pool;