const express = require('express')
const app = express()



app.get('/', (req, res) => res.send('home page'))

app.get('/view/:someparam', (req, res) => {
    const someparam = req.params.someparam;
    res.render('main.ejs', {param: someparam})
})




app.listen(3000, ()=> console.log('app started on localhost 3000'))