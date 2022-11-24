const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground3')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    authors: [authorSchema]
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        'author.name': 'John Smith'
      }
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'Vlad' })]);
// updateAuthor('637fe2dfa5a2efe14a2f804c');
// addAuthor('637ff0cdc5d1ef9345add985', new Author({ name: 'Amy' }));
removeAuthor('637ff0cdc5d1ef9345add985', '637ff13cb07b4dd0dc804f5e');
