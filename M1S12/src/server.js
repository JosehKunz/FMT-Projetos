const express = require('express') 
const cors = require('cors') // Biblioteca para headers http
const { connection } = require('./database/connection') // Acesso ao banco de dados
const routes = require('./routes/routes')

const PORT_API = process.env.PORT_API 

class Server {
  constructor (server = express())//  Funções do express
  { 
    this.middlewares(server) // Função middlewares
    this.database()  // Função database
    server.use(routes)
    this.initializeServer(server) // InitializeServer

  }

  async middlewares(app) {
    app.use(cors()) // Cors dentro do servidor
    app.use(express.json()) // Json no servidor
  }

  async database() {
    try {
      await connection.authenticate(); // Conexão com BD
      console.log('Conexão foi bem sucedida!');
    } catch (error) {
      console.error('Não conectamos com o banco de dados.', error);
      throw error
    }
  }

  async initializeServer(app) {
    // Valor da porta do servidor
    app.listen(PORT_API, () => console.log(`Servidor executando, porta: ${PORT_API}`)) 
  }
}

module.exports = { Server } 