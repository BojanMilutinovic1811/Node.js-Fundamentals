const express = require('express');
const app = express()
const body_parser = require('body-parser')
const request = require('request')


app.use(body_parser.urlencoded({extended:true}))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('home')
})


app.post('/movie-search', (req, res) => {
    const search = req.body.search
    console.log(search);
    let url = `http://www.omdbapi.com/?s=${search}&apikey=thewdb`;
    console.log(url);
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            res.render('results', {search: data})
        }
    })
})

app.listen(3000, ()=> {
    console.log('app started on 3000');
})