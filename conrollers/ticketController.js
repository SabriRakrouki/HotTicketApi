const Tickets = require('../schemas/ticketsSchema')
const Users = require('../schemas/userSchema')
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
const TicketController = {
    reserveTicket: async (req, res) => {
        const user = Users.findById(req.body.user.id)
        const eventNeeded = Events.findById(req.body.events.id)
        const { name, surname, email } = { user };
        const { eventname } = { eventNeeded }
        const entryNumber = req.body.entryNumber;
        const Ticket = new Tickets({ name, surname, email, eventname, entryNumber });
        await Events.findByIdAndUpdate(eventNeeded, { ticketNumber: eventNeeded.ticketNumber - entryNumber });
        await Ticket.save();

    }
    ,getAllTicket:async(req,res)=>{
        try {

            const feature = new Apifeatures(Tickets.find(), req.query).filtering().sorting().paginating()

            const tickets = await feature.query

            res.json({
                status: 'success',
                result: tickets.length,
                tickets: tickets
            })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getTicketById:async(req,res)=>{
        try {

            const ticket = await Tickets.findOne(req.body.ticket.id)


            res.json({
                status: 'success',
               
                ticket: ticket
            })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getTicketByEvent:async(req,res)=>{
        try {

            const ticket = await Tickets.findOne(req.body.ticket.eventname)


            res.json({
                status: 'success',
               
                ticket: ticket
            })


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
    



}

module.exports = TicketController;