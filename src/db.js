const mongoose = require('mongoose')
require('dotenv').config()

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('DB connected')
    }).catch((err) => {
        console.log(err)
    })
}
    