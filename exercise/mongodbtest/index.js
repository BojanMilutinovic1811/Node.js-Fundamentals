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

async function createCourse() {
    const course = new Course({
        name: 'idemo bre',
        author: 'javascript ninja',
        tags: ['another one bites the dust', 'we are the champions'],
        isPublished: true
    })

    const result = await course.save()
    console.log(result)
}


async function getCourses() {
    const courses = await Course.find()
    console.log(courses);
}

createCourse();