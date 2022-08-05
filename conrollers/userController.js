const User = require('../schemas/userSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Role } = require('../helper/role')
const { simpleUserSchema, Authentication, eventProvideSchema } = require('../helper/validationSchema')



const userController = {
    registerSimpleUser: async (req, res) => {
        try {
            const result = simpleUserSchema.validateAsync(req.body);
            console.log(result)
            const { name, email, password, surname, birthDate, phoneNumber } = req.body;
            const user = await User.findOne(email)

            if (user) return res.status(400).json({ msg: 'the email already exists.' })
            if (password.length < 8)
                return res.status(400).json({ msg: "password is at least 8 char length" })
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                name, email, password: passwordHash, surname, birthDate, phoneNumber
            })
            newUser.role = Role.BASIC
            //Save mongodb
            await newUser.save();
            const accesstokent = createAccessToken({ id: user._id, role: user.role })
            const refreshtoken = createRefreshToken({ id: user._id, role: user.role })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    adminRegister: async (req, res) => {
        try {

            const { name, email, password } = req.body;
            const user = await User.findOne({ email })
            if (user) return res.status(400).json({ msg: 'the email already exists.' })
            if (password.length < 6)
                return res.status(400).json({ msg: "password is at least 6 char length" })

            //password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new User({
                name, email, password: passwordHash
            })
            newUser.role = Role.ADMIN
            //Save mongodb
            await newUser.save();
            const accesstokent = createAccessToken({ id: user._id, role: user.role })
            const refreshtoken = createRefreshToken({ id: user._id, role: user.role })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    eventProvideRegister: async (req, res) => {

        try {
            const result = simpleUserSchema.validateAsync(req.body);
            console.log(result)
            const { name, email, password, surname, birthDate, phoneNumber } = req.body;
            const user = await User.findOne(email)

            if (user) return res.status(400).json({ msg: 'the email already exists.' })
            if (password.length < 8)
                return res.status(400).json({ msg: "password is at least 8 char length" })
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                name, email, password: passwordHash, surname, birthDate, phoneNumber, eventComapny
            })
            newUser.role = Role.EventProvider
            //Save mongodb
            await newUser.save();
            const accesstokent = createAccessToken({ id: user._id, role: user.role })
            const refreshtoken = createRefreshToken({ id: user._id, role: user.role })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }


    }
    ,
    login: async (req, res) => {
        try {
            const result = Authentication.validateAsync(req.body);
            const { email, password } = req.body;
            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })
            //If login succes , create access tokent and refresh token 

            const accesstokent = createAccessToken({ id: user._id, role: user.role })
            const refreshtoken = createRefreshToken({ id: user._id, role: user.role })


            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'

            })
            res.json({ accesstokent })
        } catch (err) {
            return res.status(500).json({ msg: err.message })


        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: 'Logged out' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }

    },
    refreshToken: (req, res) => {

        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })
            jwt.verify(rf_token, process.env.REFRECH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" })
                const accesstokent = createAccessToken({ id: user._id, role: user.role })
                res.json({ accesstokent })
            })
            // res.json({rf_token})
        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }



    }, getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User does not exist" })
            res.json(user)

        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }

    }





}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRECH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userController;