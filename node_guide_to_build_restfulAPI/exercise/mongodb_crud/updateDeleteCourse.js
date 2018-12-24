const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://bojan:bojan@mongodbtest-mjihi.mongodb.net/test?retryWrites=true';

mongoose.connect(mongodb, { useNewUrlParser: true })
.then(() => {
    console.log('connected')
})
.catch(err => console.log('error', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now}, 
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function updateCourse(id) {

    const course = await Course.findById(id)
    if(!course) return

    course.name = 'hello world';
    course.author = 'com truise';

    const result = await course.save()

    console.log(result)
}
async function removeCourse(id) {

    const result = await Course.deleteOne({_id: id})

    

    console.log(result)
}

removeCourse('5c1fef6b504d7d1eccff2ae2');