const fs = require('fs');

// const files = fs.readdirSync('./');

const files = fs.readdir('../', (err, res) => {
    if (err) console.log('error')
    else console.log('response:', res)
})
console.log(files)