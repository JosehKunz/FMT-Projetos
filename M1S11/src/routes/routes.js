const { Router } = require('express') // 
const Aluno = require('../models/aluno')
const Curso = require('../models/Curso')
const { INTEGER } = require('sequelize')

const routes = new Router()

routes.get('/bem_vindo', (req, res) => {
    res.json({name: 'Bem vindo'})
})


//Alunos 

routes.post('/alunos', async (req, res) => {

    const nome = req.body.nome
    const data_nascimento = req.body.data_nascimento
    const celular = req.body.celular

 const aluno = await Aluno.create({
    nome: nome,
    data_nascimento: data_nascimento,
    celular: celular
 })
 res.json(aluno)

})

routes.get('/alunos', async (req,res) => {
    const alunos = await Aluno.findAll()
    res.json(alunos)
})

//Cursos  TRABALHO PARA ENTREGAR [M1S11] Ex. 1

routes.post('/cursos', async (req, res) => {

    try {
        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas
        
        if(!nome) {
            return res.status(400).json({ message: 'O nome do Curso é obrigatório!'})
        }
        
        if(isNaN(duracao_horas)) {
            return res.status(400).json({ message: 'Precisa ser um número'})
        }
        if(!duracao_horas) {
            return res.status(400).json({ message: 'A duração é obrigatória!'})
        }

        const cursos = await Curso.create({
        nome: nome,
        duracao_horas: duracao_horas
     })
     res.status(201).json(cursos)

    } catch(error) {
        res.status(500).json({error: 'Não foi possível cadastrar o curso'})
    }
})

//Cursos  TRABALHO PARA ENTREGAR [M1S11] Ex. 2 e Ex.3

routes.get('/cursos', async (req,res) => {
    const nome = req.query.nome
    const duracao_horas = req.query.duracao_horas
    const cursos = await Curso.findAll({
        where: {
            nome: nome  
        }
    })
    res.json(cursos)
})

//Cursos  TRABALHO PARA ENTREGAR [M1S11] Ex. 4

routes.put('/cursos/:id', async (req,res) => {
const id = req.params.id

const curso = await Curso.findByPk(id)

    if(!curso) {
        return res.status(404).json({message: 'Curso não localizado'})
    }
curso.update(req.body)
await curso.save()

res.json(curso)



}


)


//Cursos  TRABALHO PARA ENTREGAR [M1S11] Ex. 5

routes.delete('/cursos/:id', (req,res) => {
    const id =  req.params.id

    Curso.destroy({
        where: {
            id: id
        }
    })
    res.status(204).json({})

})


module.exports = routes

