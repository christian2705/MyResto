const { verifyToken } = require("../Helpers/jwt")
const{ User } = require('../models')

async function authentication(req,res,next){

    try {
        console.log('ini authentication')
        // console.log(req.headers)
        let accessToken = req.headers.authorization
        if(!accessToken){
            throw{name:'Unauthenticated'}
        }

        let {id} = verifyToken(accessToken.split(' ')[1])//cek token

        let user = await User.findByPk(id)//ada user nya ga?
        if(!user){
            throw{name:'Unauthenticated'}
        }

        // console.log(user.role)

        req.user = { //simpan data user dalam objek request
            id: user.id,
            email: user.email,
            role: user.role
        }

        next()
    } catch (error) {
        next(error)
    }
} 

module.exports = authentication