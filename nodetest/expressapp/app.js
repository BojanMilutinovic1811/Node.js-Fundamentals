const express = require('express');


const app = express();

app.get('/', (req, res) => {
    res.send('hi there')
console.log('someone requsted home page');
}
)

app.get('/buy', (req, res) => {
    res.send('buy')
    console.log('someone requested buy');   
})



app.listen(3000, () => console.log('hello'))