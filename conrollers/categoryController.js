const Category = require('../schemas/categorySchema')
class Apifeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //this.queryString = req.query 
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|lt|lte|regex)\b/g, match => '$' + match)
        //gte= greater than or equal 
        //lte = lesser than or equal
        //lt = lesser than 
        //gt = greater than
        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)

        }
        else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.page * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
const CategoryController = {
    getAllCategories: async (req, res) => {
        try {

            const feature = new Apifeatures(Category.find(), req.query).filtering().sorting().paginating()

            const category = await feature.query

            res.json({
                status: 'success',
                result: category.length,
                categories: category
            })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
    ,
    getCategoryById: async (req, res) => {
        try {
            const category = await User.findById(req.category.id)
            if (!category) return res.status(400).json({ msg: "Category does not exist" })
            res.json(category)

        } catch (err) {
            return res.status(500).json({ msg: err.message })


        }
    },
    addCategory: async (req, res) => {
        try {
            const { CategoryName } = req.body


            const category = await Category.findOne({ CategoryName })
            if (category)
                return res.status(400).json({ msg: 'This Category already exists.' })
            const newCategory = new Events({
                CategoryName
            })
            await newCategory.save()

            res.json({ msg: "Created a Category" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategroy: async (req, res) => {

        try {
            const { CategoryName } = req.body


            await Category.findOneAndUpdate({ _id: req.params.id }, {
                CategoryName

            })
            res.json({ msg: 'Update a Category' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "Category deleted" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

}
module.exports = CategoryController