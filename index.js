const express = require("express")
const path = require('path')

const app = express()

app.use(require('cors')())

const bodyParser = require('body-parser');
app.use(bodyParser.json()) 

app.use('/uploads',express.static(path.join(__dirname + '/uploads')))

require('./routers/admin')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
    
})