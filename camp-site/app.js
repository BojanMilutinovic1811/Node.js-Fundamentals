const express = require("express");
const mongoose = require('mongoose');
const database = require('./config/keys').mongoURI;

//routes
const campgrounds = require('./routes/campgrounds')
const auth = require('./routes/auth')
const comments = require('./routes/comments')

const app = express();

mongoose.connect(database, {
  useNewUrlParser: true
}, () => console.log('data base connected'))



app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");



app.get("/", (req, res) => {
  res.render("home");
});

app.use('/', auth)
app.use('/campgrounds', campgrounds)
app.use('/campgrounds', comments)




app.listen(3001, () => console.log("app runnin on port 3001"));
