const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello there')
})

app.get('/api/customers', (req, res) => {
    res.send('get your customers')
})

app.get('/api/customers/:id/:score', (req, res) => {
    res.send(req.query)
    
})

const port = process.env.port || 3000;


app.listen(port, console.log(`listening ${port}`))