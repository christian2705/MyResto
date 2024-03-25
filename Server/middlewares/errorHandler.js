function errorHandler(error,req,res,next){

    let statusCode,message
    console.log(error)
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstrainError":
                statusCode = 400
                message = error.errors[0].message
            break;
        case "JsonWebTokenError":
        case "Unauthenticated":
                statusCode = 401
                message = "Unauthenticated"
            break;
        case "Forbidden":
                statusCode = 403
                message = "Unauthenticated"
            break;
        case "Not Found":
                statusCode = 404
                message = "Cuisine not found"
            break;
        default:
            statusCode = 500
            message = "Internal server error"
            break;
    }

    res.status(statusCode).json({message})
}

module.exports = errorHandler