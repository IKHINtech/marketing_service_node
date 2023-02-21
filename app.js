const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.options("*", cors())

app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send('Congratulations! API is working!')
})

const db = require('./models')

db.sequelize.sync({ force: true });
module.exports = app;