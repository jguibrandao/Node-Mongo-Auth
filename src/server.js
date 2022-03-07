const connect = require('./db')
const app = require('./config/app')

connect()
app.listen(process.env.PORT || 3000, console.log('rodando'));