class UserController {
    async register(req, res) {
        const { name, email, password, confirmpassword } = req.body

        if(!name) {
            return res.status(401).json({msg: 'Missing name'})
        }
    }
}

module.exports = new UserController()