const jwt = require("jsonwebtoken")
const roleMiddelWare = (role) => {
    return (req, res, next) => {
        
        if (req.user?.role != role) return res.status(401).json({ msg: "Not Allowed" })

        next()
    }


}
module.exports = roleMiddelWare