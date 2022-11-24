const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network']
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        });
      },
      message: 'A course should have at least one tag'
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    category: 'web',
    author: 'Mosh',
    tags: [],
    isPublished: true,
    price: 15
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.errors);
  }
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

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

createCourse();
