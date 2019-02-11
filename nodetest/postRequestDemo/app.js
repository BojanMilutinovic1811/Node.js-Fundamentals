const express = require('express');
const app = express();
const body_parser = require('body-parser')

const friends = ['Zoran', 'Mandrak', 'Fantom', 'Dylan', 'Zagor']


app.use(body_parser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/friends', (req, res) => {


    res.render('friends', {friends: friends})
})

app.post('/add-friend', (req, res) => {

    const friend = req.body.friend;
    console.log(friend);
    friends.push(friend)

    res.redirect('/friends')

})

app.get('*', (req, res) => {
    res.render('error')
})


app.listen(3000, ()=> console.log('app started on port 3000'))