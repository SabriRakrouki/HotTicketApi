const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {

        const token = req.header("Authorization")
        console.log(token)

        if (!token) return res.status(400).json({ msg: "Invalid Authentication" })
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication" })


            req.user = user

            next()

        })


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


const authAdmin = async (req, res, next) => {
    try {

        // Get user inforamtion by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if (user.role === 0) return res.status(400).json({ msg: 'Admin resources access denied' })
        next()

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports = { auth, authAdmin }