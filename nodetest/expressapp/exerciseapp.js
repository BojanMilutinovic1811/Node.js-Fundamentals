const express = require('express')

const app = express();


app.get('/', (req, res) => res.send('Hi there welcome to home page!'))


app.get('/speak/:animal', (req, res) => {
    const animal = req.params.animal.toLowerCase();
    switch(animal) {
        case 'pig': 
        res.send(`The pig says Oink!`)
        break;
        case 'cow': 
        res.send('The cow says moo')
        break;
        case 'dog':
        res.send('The dog says wof wof')
        break;
        default: 
        res.send('hello there')
    }   
})

app.get('/repeat/:word/:times', (req, res) => {
    const word = req.params.word.toLowerCase();
    const times = req.params.times;
    function multipleWords(word, times) {
        let multipleWords = ''
        for(let i = 0; i<times; i++) {
            multipleWords += (word + ' ')
        }
        return multipleWords; 
    }
    wordsToShow = multipleWords(word, times)
    res.send(wordsToShow)
})


app.get('*', (req, res) => res.send('Sorry this page does not exist'))

app.listen(3000, () => console.log('app started on port 3000'))