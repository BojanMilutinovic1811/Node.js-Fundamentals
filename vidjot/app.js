const express = require('express')
var exphbs  = require('express-handlebars');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session') 


const app = express();

mongoose.connect('mongodb+srv://bojan:bojan@mongodbtest-mjihi.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
.then(()=> console.log('Mongo db connected'))
.catch(err => console.log(err))


require('./models/Ideas')
const Idea = mongoose.model('ideas')


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride('_method'))


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/ideas', (req, res) => {

    Idea.find({})
    .sort({date: 'desc'})
    .then(ideas => {
        res.render('./ideas/indexIdeas', {ideas})
    })

})

app.get('/ideas/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        console.log(idea);
        res.render('./ideas/editIdea', {idea})
    })
})

app.put('/ideas/:id', (req, res) => {

    Idea.findOne({
        _id: req.params.id
    }).then( idea => {
        idea.title = req.body.title;
        idea.details = req.body.details; 

        idea.save()
        .then(idea => {
            res.redirect('/ideas')
        })
    } )
})

app.delete('/ideas/:id', (req, res) => {
    Idea.deleteOne({
        _id: req.params.id
    }).then(()=> res.redirect('/ideas'))
})

app.get('/ideas/add', (req, res) => {
    res.render('./ideas/addIdea')
})

app.post('/ideas', (req, res) => {
    const newUser = {
        title: req.body.title,
        details: req.body.details
    }

    new Idea(newUser).save()
        .then(idea => {
            res.redirect('/ideas')
        })
})




app.get('/about', (req, res) => {
    res.render('about')
})



const port = 3000; 

app.listen(port, ()=> console.log(`App started on port ${port}`))