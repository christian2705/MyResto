const { Category } = require('../models')

class CategoryController{

    static async showCategory(req, res) {
        try {
            const categories = await Category.findAll()
            res.status(200).json(categories)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async createCategory(req, res) {
        try {
            // console.log(req.body)
            const categories = await Category.create(req.body)
            res.status(201).json(categories)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({ message: error.errors[0].message })
            } else {
                // console.log(error.name)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    static async oneCategory(req, res) {
        try {
            const categories = await Category.findByPk(req.params.id)
            if(!categories) throw({name:'Not Found'})
            res.status(200).json(categories)
        } catch (error) {
            if(error.name === "Not Found"){
                res.status(404).json({message:'Category not found'})
            }else{
                console.log(error)
                res.status(500).json({ message: 'Internal Server Error' })

            }
        }
    }

    static async editCategory(req, res) {
        try {
            const categories = await Category.findByPk(req.params.id)
            if(!categories) throw({name:'Not Found'})
            console.log(categories)

            await categories.update(req.body)
            res.status(200).json({message:`Category with id ${req.params.id} has been updated`})
        } catch (error) {
            console.log(error.name)
            if(error.name === "SequelizeValidationError"){
                res.status(400).json({ message: error.errors[0].message })
            } else if(error.name === "Not Found"){
                res.status(404).json({message:'Category not found'})
            }else{
                res.status(500).json({ message: 'Internal Server Error' })

            }
        }
    }

    static async deleteCategory(req, res) {
        try {
            const categories = await Category.findByPk(req.params.id)
            if(!categories) throw({name:'Not Found'})
            console.log(categories)
        
            await categories.destroy()
            res.status(200).json({message:`Category with id ${req.params.id} has been deleted`})
        } catch (error) {
            if(error.name === "Not Found"){
                res.status(404).json({message:'Category not found'})
            }else{
                console.log(error)
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

}

module.exports = CategoryController