const User = require('../schemas/userSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password,surname,birthDate,phoneNumber } = req.body;
            const user = await User.findOne(email)
            if (user) return res.status(400).json({ msg: 'the email already exists.' })
            if (password.length < 8)
                return res.status(400).json({ msg: "password is at least 8 char length" })
            const passwordHash = await bcrypt.hash(password,10)
            const newUser = new Users({
                name, email, password: passwordHash
            })
            //Save mongodb
            await newUser.save();
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
}

}


module.exports = userController;