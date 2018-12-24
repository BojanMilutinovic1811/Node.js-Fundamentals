const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://bojan:bojan@mongodbtest-mjihi.mongodb.net/test?retryWrites=true';




mongoose.connect(mongodb, {useNewUrlParser:true})
.then(()=> console.log('connected'))
.catch(err=>console.log(err))

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
        // match: /regex/
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(value, callback) {
                setTimeout(() => {
                    const result = value && value.length > 0;
                    callback(result)
                }, 3000);
            }
        }
    },
    date: {type: Date, default: Date.now}, 
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){return this.isPublished},
        max: 200,
        min: 10
    }
})

const Course = new mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'hello there',
        category: 'webdev',
        author: 'test test', 
        tags: ['blallalablalb', 'falsdfakdslj'],
        isPublished: false,
        price: 150
    })

    try {
        const result = await course.save()
        console.log(result)
    }
    catch(ex) {
        console.log(ex)
    }


}

createCourse();