const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
  });

  const result = await course.save();
}

async function getCourses() {
  const courses = await Course.find({ author: 'Mosh', isPublished: true })
    .or([{ author: 'Mosh' }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// Query first approach
// Depending on business rules, for example if course is published, we are not allowed to change author. So we need to retrieve the course first.
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = 'Another author';

  // alternative approach
  // course.set({
  //   isPublished: true,
  //   author: 'Another Author'
  // });

  const result = await course.save();
  console.log(result);
}

// Update first approach
// Just need to update documents
async function updateCourse_2(id) {
  // const result = await Course.updateMany(
  //   { _id: id },
  //   {
  //     $set: {
  //       author: 'Mosh',
  //       isPublished: false
  //     }
  //   }
  // );

  // if we want to get the updated document, we need to use .findByIdAndUpdate
  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        author: 'Jason',
        isPublished: false
      }
    },
    { new: true }
  );

  // console.log(result);
  console.log(course);
}

// updateCourse_2('637b17eb34945e650480a4e5');

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

removeCourse('637b17eb34945e650480a4e5');
