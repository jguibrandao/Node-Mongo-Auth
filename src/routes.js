const UserController = require("./controllers/userController")
const Auth = require("./middlewares/auth")

const routes = require("express").Router()

routes.get('/', (req, res) => {
    try {
        return res.status(200).json('salve')
    } catch (error) {
        return res.status(400).json(error)
    }
})

routes.post('/auth/register', UserController.register)
routes.post('/auth/login', UserController.login)

routes.get('/user/:id', Auth.checkToken, UserController.findOne)

module.exports = routes