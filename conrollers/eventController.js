const Events = require('../schemas/eventSchema')


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



const eventController = {
    getAllEvent: async (req, res) => {
        try {

            const feature = new Apifeatures(Events.find(), req.query).filtering().sorting().paginating()

            const events = await feature.query

            res.json({
                status: 'success',
                result: events.length,
                events: events
            })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addEvent: async (req, res) => {
        try {
            const { event_id, eventName, dateBegin, dateEnd, eventProvide, category_id, images } = req.body
            if (!images) return res.status(400).json({ msg: 'No image upload' })

            const event = await Events.findOne({ product_id })
            if (event)
                return res.status(400).json({ msg: 'This event already exists.' })
            const newEvent = new Events({
                event_id, eventName, dateBegin, dateEnd, eventProvide, category_id, images
            })
            await newEvent.save()

            res.json({ msg: "Created a event" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req, res) => {
        try {
            await Events.findByIdAndDelete(req.params.id)
            res.json({ msg: "event deleted" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateEvent: async (req, res) => {
        try {
            const { event_id, eventName, dateBegin, dateEnd, eventProvide, category_id, images } = req.body
            if (!images) return res.status(400).json({ msg: 'No image upload' })

            await Events.findOneAndUpdate({ _id: req.params.id }, {
                event_id, eventName, dateBegin, dateEnd, eventProvide, category_id, images
            })
            res.json({ msg: 'Update a Event' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEventById: async (req, res) => {

    }



}




module.export = eventController;