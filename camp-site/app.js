const express = require("express");
const mongoose = require('mongoose');
const database = require('./config/keys').mongoURI;
const Campground = require('./models/Campground')

const app = express();

mongoose.connect(database, {
  useNewUrlParser: true
}, () => console.log('data base connected'))



app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// const campgrounds = [{ name: 'Zlatibor', img: 'http://monix.rs/wp-content/uploads/2017/08/Naselje-Vodice.jpg' },
// { name: 'Durmitor', img: 'http://monix.rs/wp-content/uploads/2017/08/Naselje-Vodice.jpg' }, { name: 'Tara', img: 'http://monix.rs/wp-content/uploads/2017/08/Naselje-Vodice.jpg' }]

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({})
    .then(campgrounds => {
      res.render("campgrounds", { campgrounds });
    })
    .catch(err => console.log(err))
});

app.post('/campgrounds', (req, res) => {
  const location = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = { location, image, description }
  Campground.create(newCampground)
    .then(newCampground => {
      res.redirect('/campgrounds')
    })
    .catch(err => console.log(err))
})

app.get('/campgrounds/new', (req, res) => {
  res.render('new')
})


app.get('/campgrounds/:id', (req, res) => {

  Campground.findById(req.params.id)
    .then(campground => {
      console.log(campground);
      res.render('show', { campground })
    })
    .catch(err => console.log(err))
})

app.listen(3000, () => console.log("app runnin on port 3000"));
