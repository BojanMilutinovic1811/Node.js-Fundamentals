

function middlewareTest(req, res, next) {
    console.log('hello there im middleware');
    next()
}


module.exports = middlewareTest; 