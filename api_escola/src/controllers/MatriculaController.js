const Aluno = require("../models/Aluno")
const Matricula = require("../models/Matricula")
const Curso = require("../models/Curso")


class MatriculaController {

    async cadastrar(req, res) {



        try{
        const curso_id = req.body.curso_id // id do curso
        const aluno_id = req.body.aluno_id // id do aluno

        if (!curso_id || !aluno_id) {
            return res
                .status(400)
                .json({ mensagem: 'O ID do aluno e do curso são obrigatórios' })
        }

        const aluno = await Aluno.findByPk(aluno_id)
        if (!aluno) return res.status(404).json({ message: 'O aluno não existe' })

            //verificando se o curso existe:
        const curso = await Curso.findByPk(curso_id)
        if(!curso) return res.status(404).json({mensage: 'Não localizamos o curso!'})

            //Validando se já existe o mesmo curso para o aluno
        const matriculaExistente = await Matricula.findOne({curso_id: curso_id, aluno_id: aluno_id})
        if(matriculaExistente) {
            return res.status(409).json({message:'uma matrícula já está cadastrada para este curso!'})
        }

        const matricula = await Matricula.create({
            curso_id: curso_id,
            aluno_id: aluno_id
        })

        res.status(201).json(matricula)
    }
    catch(error) {
        res.status(500).json({mensagem:'Não foi possível realizar a matrícula!'})
    }
}

}

module.exports = new MatriculaController()