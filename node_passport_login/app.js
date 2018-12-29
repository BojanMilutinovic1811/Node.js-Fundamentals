const express = require('express');
const app = express();
const index = require('./routes/index')
const users = require('./routes/users');
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('view engine', 'ejs')

app.use('/', index);
app.use('/users', users)



const PORT = process.env.PORT || 3000


app.listen(PORT, console.log(`Server started on port ${PORT}`))



