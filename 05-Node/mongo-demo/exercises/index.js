const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function exercise_1() {
  return await Course.find({ isPublished: true, tags: 'backend' })
    .select({ name: 1, author: 1 })
    .sort({ name: 1 });
}

async function exercise_2() {
  return await Course.find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
    .sort('-price')
    .select('name author price');
}

// async function exercise_2() {
//   return await Course.find({ isPublished: true })
//     .or([{ tags: 'frontend', tags: 'backend' }])
//     .sort('-price')
//     .select('name author price');
// }

async function exercise_3() {
  return await Course.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i }
  ]);
}

async function displayCourses(expr) {
  let courses;
  switch (expr) {
    case 'exercise_1':
      courses = await exercise_1();
      console.log('Exercise-1: ', courses);
      break;

    case 'exercise_2':
      courses = await exercise_2();
      console.log('Exercise-2: ', courses);
      break;

    case 'exercise_3':
      courses = await exercise_3();
      console.log('Exercise-3: ', courses);
      break;
  }
}

displayCourses('exercise_3');
