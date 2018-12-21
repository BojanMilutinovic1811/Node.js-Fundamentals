const express = require('express');
const Joi = require('joi');



const app = express();

const customers = [{id: 1, name:'Bojan'}, {id: 2, name:'Zagor'}, {id: 3, name: "Ciko"}]

app.use(express.json())

app.get('/', (req, res) => {
    res.send('home page')
})

// app.get('/customers', (req, res) => {
//     res.send(customers)
// })

app.post('/customers/post', (req, res) => {

const schema = {name: Joi.string().min(3).max(30).required()}
const result = Joi.validate(req.body, schema);
console.log(result)

if(result.error) {
    res.status(400).send(result.error.details[0].message)
} else {
    const customer = {id: customers.length + 1, name: req.body.name }
        customers.push(customer);
        res.send(customers);
}

})



const port = process.env.port || 3000; 

app.listen(port, console.log('listening port'));
