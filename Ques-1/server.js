const express = require('express')
const axios = require('axios')
require('dotenv').config()
const app = express()

var window = []

app.get('/', async (req, res) => {
    res.send('Server is up and running!')
})
app.get('/numbers/:id', async (req, res) => {
    const { id } = req.params
    if (id != 'p' && id != 'e' && id != 'r' && id != 'f') return res.status(404).json({ msg: "Please give a vaild id!" })
    try {
        if (id == 'p') typeofnumbers = 'primes'
        else if (id == 'f') typeofnumbers = 'fibo'
        else if (id == 'e') typeofnumbers = 'even'
        else typeofnumbers = 'rand'
        const resp = await axios.get(`${process.env.ENDPOINT}/test/${typeofnumbers}`, {
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        var windowPrevState = [...window]
        var { numbers } = resp.data
        let unique = numbers.reduce(function (acc, curr) {
            if (!acc.includes(curr))
                acc.push(curr);
            return acc;
        }, []);

        unique.forEach(num => {
            if (!window.includes(num)) {
                if (window.length >= 10) { // Assuming window size to be 10
                    window.shift();        // deleting previous old numbers
                }
                window.push(num);
            }
        });
        var windowCurrState = [...window];

        res.status(200).json({
            numbers: unique,
            windowPrevState,
            windowCurrState,
            avg: 5, 
        });
    }
    catch (err) {
        console.log(err);
    }
})
app.listen(process.env.PORT)