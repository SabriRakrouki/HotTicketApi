const jwt = require("jsonwebtoken")
const { Role } = require("../helper/role")

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
const authRole = ([role]) => {
    return (req, res, next) => {
        role.forEach(r => {
            if (req.user.role === r) next()
        });
        return res.status(401).json({ msg: "Not Allowed" })



    }
}

const authAdmin = async (req, res, next) => {
    try {

        // Get user inforamtion by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if (user.role === Role.ADMIN) return res.status(400).json({ msg: 'Admin resources access denied' })
        next()

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports = { auth, authAdmin, authRole }