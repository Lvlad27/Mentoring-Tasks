const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const auth = require('./middleware/auth');
const logger = require('./middleware/logger');
const Joi = require('joi');

const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

// this is adding a piece of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}
// custom middleware
app.use(logger);
app.use(auth);

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  debug(`Listening on port ${port}`);
});
