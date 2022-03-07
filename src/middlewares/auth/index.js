const bcrypt = require('bcrypt')

const Auth = {
    async createPassword(password) {
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        return passwordHash
    }
}
    


module.exports = Auth