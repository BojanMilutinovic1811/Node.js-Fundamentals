const http = require('http');


const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('hello everybody')
        res.end()
    }
});

server.listen(3000);

console.log('listening 3000')
