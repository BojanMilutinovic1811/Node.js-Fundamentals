const fs = require('fs');

const routeHandler = (req, res) => {
    
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<html><head><title>Test</title></head><body><form action="/message" method="POST"><input type="text" name="some text"/><input type="submit" value="submit"/></form></body></html>');
        return res.end()
    }

    if (url === '/message' && method === "POST") {

        const body = [];

        req.on('data',chunk => {
            console.log(chunk)
            body.push(chunk)
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })


        res.statusCode = 302;
        res.setHeader("Location", '/')
        return res.end();

    }

    res.write('<h1>tralalal</h1>')
    res.end()


    console.log('hello');

}

module.exports = routeHandler; 