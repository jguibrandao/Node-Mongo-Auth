const UserController = require("./controllers/userController")

const routes = require("express").Router()

routes.post('/auth/register', UserController.register)

module.exports = routes