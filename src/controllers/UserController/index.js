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
}

module.exports = new UserController()