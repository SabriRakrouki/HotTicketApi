const Joi = require('joi')


const simpleUserSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    surname: Joi.string().min(3).required(),
    birthDate: Joi.date().required(),
    phoneNumber: Joi.string().min(8).required(),
    role: Joi.string().required()


})

const eventProvideSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    surname: Joi.string().min(3).required(),
    birthDate: Joi.date().required(),
    phoneNumber: Joi.string().min(8).required(),
    eventComapny:Joi.string().min(3).required,
    role: Joi.string().required()


})


const Authentication = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
})



module.exports = { simpleUserSchema, Authentication,eventProvideSchema }