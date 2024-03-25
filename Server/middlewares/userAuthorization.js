function userAuthorization(req,res,next){
    try {
        const {email,role} = req.user
        console.log(req.user)

        if(role == 'Admin'){
            return next()
        }else {
            throw{name:'Forbidden'}
        }

    } catch (error) {
        next(error)
    }
}

module.exports = userAuthorization