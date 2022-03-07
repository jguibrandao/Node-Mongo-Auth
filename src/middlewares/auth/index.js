require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Auth = {
    async createPassword(password) {
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        return passwordHash
    },

    async checkPassword(password, userPassword) {
        const checkPassword = await bcrypt.compare(password, userPassword)
        return checkPassword
    },

    async authLogin(user, res) {
        try {
            const secret = process.env.SECRET

            const token = jwt.sign(
                {
                id: user._id,
                },
                secret,
            )

            return res.status(200).json({ msg: 'sucessful login', token, user_id: user._id })
        } catch (err) {
            return res.status(401).json(err)
        }
       
    },

    checkToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({msg: 'No allowed / missing token'})
        }

        try {
            const secret = process.env.SECRET
            jwt.verify(token, secret)

            next()
        } catch (error) {
            return res.status(400).json({msg: 'Invalid Token'})
        }
    }
}
    


module.exports = Auth