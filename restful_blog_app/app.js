const express = require('express');
const app = express();
const mongoose = require('mongoose');
const body_parser = require('body-parser')
const method_override = require('method-override')


mongoose.connect('mongodb+srv://bojan:bojan@mongodbtest-mjihi.mongodb.net/test?retryWrites=true', {useNewUrlParser:true}, ()=> console.log('db connected'))

app.use(express.static('public'))
app.use(body_parser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(method_override('_method'))



const blogSchema = new mongoose.Schema({
    title: String, 
    image: String,
    body: String, 
    created: {type: Date, default: Date.now}
})

const Blog = new mongoose.model('blog', blogSchema);

app.get('/', (req ,res) => {
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {

    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs})
        }
    })

})

app.get('/blogs/new', (req, res) => {
    res.render('new_blog')
})

app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render('new_blog')
        } else {
            res.redirect('/blogs')
        }
    })
})

app.get('/blogs/:id', (req, res) => {
   
    Blog.findById(req.params.id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.render('show_blog', {blog: result}) 
        }
    })
})


app.get('/blogs/:id/edit', (req, res) => {
     
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            console.log(err)
        } else {
            res.render('edit', {blog: foundBlog})
        }
    })   
})
 
app.put('/blogs/:id', (req, res) => {
 
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=> {
        if(err) {
            res.redirect('/blogs')
        } else {
            res.redirect('/blogs/'+req.params.id)
        }
    })
})

app.delete('/blogs/:id', (req, res) => {

    Blog.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) {
            res.redirect('/blogs')
        } else {
            res.redirect('/blogs')
        }
    })
})

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`blog app started on port ${port}`))