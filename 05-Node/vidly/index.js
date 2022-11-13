const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const genres = [
  {
    id: 1,
    name: 'comedy'
  },
  {
    id: 2,
    name: 'horror'
  },
  {
    id: 3,
    name: 'action'
  }
];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((item) => item.id === parseInt(req.params.id));
  !genre && res.status(404).send('There is no genre with that id.');

  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  let genre = genres.find((item) => item.id === parseInt(req.params.id));
  !genre && res.status(404).send('There is no genre with that id.');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find((item) => item.id === parseInt(req.params.id));
  !genre && res.status(404).send('There is no genre with that id.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(genre);
}

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server is online on port ${port}`);
});
