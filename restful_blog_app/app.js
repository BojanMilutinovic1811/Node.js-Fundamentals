const express = require('express');
const app = express();
const mongoose = require('mongoose');
const body_parser = require('body-parser')


mongoose.connect('mongodb+srv://bojan:bojan@mongodbtest-mjihi.mongodb.net/test?retryWrites=true', {useNewUrlParser:true}, ()=> console.log('db connected'))

app.use(express.static('public'))
app.use(body_parser.urlencoded({extended: true}))
app.set('view engine', 'ejs')



const blogSchema = new mongoose.Schema({
    title: String, 
    image: String,
    body: String, 
    created: {type: Date, default: Date.now}
})

const Blog = new mongoose.model('blog', blogSchema);

// Blog.create({
//     title: 'Test Blog',
//     image: 'Here should be an image',
//     body: 'This is the body of our blog'
// })

app.get('/blogs', (req, res) => {

    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs})
        }
    })

})

app.get('/', (req ,res) => {
    res.redirect('/blogs')
})


const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`blog app started on port ${port}`))