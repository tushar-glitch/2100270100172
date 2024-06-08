const express = require('express')
const axios = require('axios')
require('dotenv').config()
const app = express()

var window = []

app.get('/', async (req, res) => {
    res.send('Server is up and running!')
})
app.get('numbers/:id', async (req, res) => {
    const { id } = req.params
})
app.listen(process.env.PORT)