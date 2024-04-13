const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Curso = connection.define('curso', {
    nome : {
        type: DataTypes.STRING
    },
    duracao_horas: {
        type: DataTypes.STRING
    }
});

module.exports = Curso;