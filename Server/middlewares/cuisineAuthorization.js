const {Cuisine} = require('../models')

async function cuisineAuthorization(req,res,next){
    try {
        // console.log(req.user)
        const {id,role,email} = req.user

        // console.log(req.user)

        const cuisine = await Cuisine.findByPk(req.params.id)
        if(!cuisine){
            throw{name:'Not Found'}
        }

        if(req.user.role === 'Admin'){
            return next()
        }else if(id !== cuisine.authorId){
            throw{name:'Forbidden'}
        }

        next()
    } catch (error) {
        next(error)
    }
}


module.exports = cuisineAuthorization