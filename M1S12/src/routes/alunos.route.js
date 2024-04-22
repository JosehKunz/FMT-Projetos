
const { Router, query } = require('express') // 
const Aluno = require('../models/Aluno')

const { auth } = require('../midleware/auth')

const alunoRoutes = new Router

/* ----  Rotas dos Alunos ---- */

// Rota de criação de aluno | Registro
alunoRoutes.post('/', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const nome = req.body.nome
        const data_nascimento = req.body.data_nascimento
  
        if (!nome) {
            return res.status(400).json({ messagem: 'O nome é obrigatório' })
        }

        if (!data_nascimento) {
            return res.status(400).json({ messagem: 'A data de nascimento é obrigatória' })
        }

        if(!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({ messagem: 'A data de nascimento não está no formato correto' }) 
        }

        const aluno = await Aluno.create({
            email: email,
            password: password,
            nome: nome,
            data_nascimento: data_nascimento
        })

        res.status(201).json(aluno)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível cadastrar o aluno' })
    }
})

alunoRoutes.get('/', auth, async (req, res) => {
    const alunos = await Aluno.findAll()
    res.json(alunos)
})

alunoRoutes.get('/:id', auth, async (req, res) => {
    try {

        const { id } = req.params

        const aluno = await Aluno.findByPk(id)

        if(!aluno){
            return res.status(404).json({ message: "Usuário não encontrado!"})
        }

        res.json(aluno)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível listar o aluno especifico',
                              error: error})
    }
})

module.exports = alunoRoutes