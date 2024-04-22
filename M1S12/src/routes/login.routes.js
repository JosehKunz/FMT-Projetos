const { Router, query } = require('express') // 
const { sign } = require("jsonwebtoken");
const Aluno = require('../models/Aluno')

const loginRoutes = new Router()

loginRoutes.get('/bem_vindo', (req, res) => {
    res.json({ name: 'Bem vindo' })
})

/* ---- Login --- */

loginRoutes.post('/', async (req, res) => {
    try {
        const email = req.body.email
        const password =req.body.password
    
        if(!email && !password) {
            return res.status(400).json({ message: "Email ou senha, não informados!"})
        }

        // Procura na tabela Aluno, um aluno que corresponda com o email e senha fornecido!
        const aluno = await Aluno.findOne({
            where: {email:email, password:password}
        })

        if(!aluno){
            return res.status(404).json({ message: "Não existe alunos com email e senha informado!"})
        }

        const payload ={ sub: aluno.id, email: aluno.email, nome: aluno.nome}
        console.log(process.env.SECRET_JWT)


        const token = sign(payload, process.env.SECRET_JWT)
        
        res.status(200).json({Token: token})

        
    } catch (error) {
        return res.status(500).json({ error: error, message: "Algo inesperado aconteceu!"})
    }

})



module.exports = loginRoutes
