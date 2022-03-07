const Auth = require("../../middlewares/auth")
const User = require("../../models/User")

class UserController {
    async register(req, res) {
        const { name, email, password, confirmpassword } = req.body
        const userExists = await User.findOne({ email: email })

        if(userExists) {
            return res.status(401).json({msg: 'User already exists'})
        }
          
        if(confirmpassword != password) {
            return res.status(401).json({msg: 'Diff passwords'})
        }

        const passwordHash = await Auth.createPassword(password)

        try {
            const newUser = await User.create({
                name,
                email,
                password: passwordHash
            })
            return res.status(201).json({msg: 'User created'})
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    async login(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({ email: email })

        if(!email || !password) {
            return res.status(401).json({ msg: 'Missing credentials' })
        }

        if(!user) {
            return res.status(401).json({ msg: "User doesn't exists" })
        }

        const checkPassword = await Auth.checkPassword(password, user.password)

        if(!checkPassword) {
            return res.status(401).json({ msg: 'Invalid password' })
        }

        Auth.authLogin(user, res)
    }

    async findOne(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id, '-password')
            
            return res.status(201).json(user)
        } catch (error) {
            return res.status(404).json({ msg: 'User not found' })
        }
    }
}

module.exports = new UserController()