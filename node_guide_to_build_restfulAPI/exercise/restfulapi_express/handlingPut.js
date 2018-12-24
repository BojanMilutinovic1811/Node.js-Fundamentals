const express = require('express');
const Joi = require('joi');

const customers = [{id: 1, name:'Bojan'}, {id: 2, name:'Zagor'}, {id: 3, name: "Ciko"}]


const app = express();

app.use(express.json())

app.put('/customers/:id', (req, res) => {

    const customer = customers.find((customer) => customer.id === parseInt(req.params.id));
    if(!customer) {
        res.status(400).send('theres no customer with that id')
    } 
   

    const schema = {name: Joi.string().min(3).max(30).required()};
    const result = Joi.validate(req.body, schema);
    console.log(result.error)
    if(result.error) {
    res.status(400).send(result.error.details[0].message)
    } 
        console.log(req.body.name)
        customer.name = req.body.name;
        console.log(customer)

    
    console.log(customer)

    res.send(customer);


})

app.get('/customers', (req, res) => {
    res.send(customers)
})


app.delete('/customers/:id', (req, res) => {
    const customer = customers.find(customer => customer.id === parseInt(req.params.id));
    if(!customer) {
        app.status(400).send('there is no such course')
    }
    const index = customers.indexOf(customer);
    customers.splice(index,1);

    res.send(customer)
})



const port = process.env.port || 3000;
app.listen(port, console.log('hello there'))