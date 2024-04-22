//Verificar a autenticidade do Token

const {verify} = require("jsonwebtoken")


async function auth(req,res,next){

try {

    console.log("Entramos no Midleware")

    const {authorization} = req.headers

    req ['payload'] = verify(authorization, process.env.SECRET_JWT)
next()

} catch(error) {
    return res.status(401).send( {
        message: "Falha na autentificação",
    cause: error.message})
}


}

module.exports = {auth}