const EventEmitter = require('events');


class Emitter extends EventEmitter {
    log(message) {
        console.log(message)
        this.emit('messageLog', {id:1, url:'samo sljakaj'});
        this.emit('anotherEvent', {message: 'Tako je, povikase seljaci!'});
    }
}


const emitter = new Emitter();

emitter.on('messageLog', (arg)=> console.log('event emitted', arg.url))

emitter.on('anotherEvent', (arg)=>console.log(arg.message))

emitter.log('hello');

// emitter.emit('messageLog', {id:1, url:'samo sljakaj'});

// emitter.emit('anotherEvent', {message: 'Tako je, povikase seljaci!'})
