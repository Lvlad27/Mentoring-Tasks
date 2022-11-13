const Joi = require('joi');
const express = require('express');
const app = express();

// this is adding a piece of middleware
app.use(express.json());

const courses = [
  {
    id: 1,
    name: 'courses'
  },
  {
    id: 2,
    name: 'courses'
  },
  {
    id: 3,
    name: 'courses'
  }
];

app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the id was not found');

  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the id was not found');

  // Validate
  // If invalid, return 400 - Bad Request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update course
  // Return the updated course
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the id was not found');

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
