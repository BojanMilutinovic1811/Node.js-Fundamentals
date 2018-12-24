const express = require('express');
const middlewareTest = require('./middlewareTest')

const app = express();
const customers = [{id: 1, name:'Bojan'}, {id: 2, name:'Zagor'}, {id: 3, name: "Ciko"}]



app.use(middlewareTest);


app.get('/', (req, res) => {
    res.send('hello there')
})

app.get('/api/customers', (req, res) => {
    res.send('get your customers')
})

app.get('/api/customers/:id', (req, res) => {
    console.log(req.params)
    const customer = customers.find(c => c.id === parseInt(req.params.id) )
    console.log(customer)
    if(!customer) {
        res.status(404).send('Theres no customer with that id')
    } 
    res.send(customer)
    
})

const port = process.env.port || 3000;


app.listen(port, console.log(`listening ${port}`))