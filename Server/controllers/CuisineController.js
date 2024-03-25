
const { Cuisine } = require('../models')
const cloudinary = require ('cloudinary').v2
const {randomUUID} = require('crypto')
          
cloudinary.config({ 
  cloud_name: 'dfwk3eccy', 
  api_key: '669145371154471', 
  api_secret: '842tNp_9Xe5VR3G_Zg5-tMdvkH8' 
});

class CuisineController {

    static async showCuisine(req, res) {
        try {
            console.log(req.user)
            const cuisines = await Cuisine.findAll()
            res.status(200).json(cuisines)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async createCuisine(req, res) {
        try {
            // console.log(req.user)
            const cuisines = await Cuisine.create({...req.body,authorId: req.user.id})
            res.status(201).json(cuisines)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({ message: error.errors[0].message })
            } else {
                // console.log(error.name)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }


    static async detailCuisine(req, res) {
        try {
            const cuisine = await Cuisine.findByPk(req.params.id)
            if(!cuisine) throw({name:'Not Found'})
            res.status(200).json(cuisine)
        } catch (error) {
            if(error.name === "Not Found"){
                res.status(404).json({message:'Cuisine not found'})
            }else{
                console.log(error)
                res.status(500).json({ message: 'Internal Server Error' })

            }
        }
    }

    static async editCuisine(req, res) {
        try {
            const cuisine = await Cuisine.findByPk(req.params.id)
            if(!cuisine) throw({name:'Not Found'})
            console.log(cuisine)

            await cuisine.update({...req.body,authorId: req.user.id})
            res.status(200).json({message:`Cuisine with id ${req.params.id} has been updated`})
        } catch (error) {
            console.log(error.name)
            if(error.name === "SequelizeValidationError"){
                res.status(400).json({ message: error.errors[0].message })
            } else if(error.name === "Not Found"){
                res.status(404).json({message:'Cuisine not found'})
            }else{
                res.status(500).json({ message: 'Internal Server Error' })

            }
        }
    }

    static async deleteCuisine(req, res) {
        try {
            // console.log(req.user)
            const cuisine = await Cuisine.findByPk(req.params.id)
            if(!cuisine) throw({name:'Not Found'})
            // console.log(cuisine)
        
            await cuisine.destroy()
            res.status(200).json({message:`Cuisine with id ${req.params.id} success to delete`})
        } catch (error) {
            if(error.name === "Not Found"){
                res.status(404).json({message:'Cuisine not found'})
            }else{
                console.log(error)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    static async patchCuisine (req,res,next){
        try {
            const cuisine = await Cuisine.findByPk(req.params.id)

            if(!cuisine){
                throw {name:"Data not found"}
            }

            if(!req.file){
                throw {name:"Image file is required"}
            }

            console.log(cuisine)

            const base64File = Buffer.from(req.file.buffer).toString("base64")
            const dataUrl = `data:${req.file.mimetype};base64,${base64File}`
            const data = await cloudinary.uploader.upload(dataUrl, {
                public_id: `${req.file.originalName}_${randomUUID()}`,
                folder: "cuisine/images"
            })

            const editCuisine = await cuisine.update({
                imgUrl : data.secure_url
            })

            res.status(200).json(`Image ${editCuisine.name} success to update`)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CuisineController