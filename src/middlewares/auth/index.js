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
       
    }
}
    


module.exports = Auth