const express = require('express'),
	  logger = require('morgan'),
	  path = require('path'),
	  bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
	  exphbs = require('express-handlebars');

const handlebars = require('./helpers/handlebars.js')(exphbs);

// *** load environment variables *** //
  require('dotenv').config();

const indexRoutes = require('./routes/index');
const wingRoutes = require('./routes/wings');
const placeRoutes = require('./routes/places');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

const app = express();

// view engine setup
app.engine('hbs', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/places/:placeId/wings', wingRoutes);
app.use('/places', placeRoutes);
app.use('/places/:placeId/wings/:wingId/reviews', reviewRoutes);

// start server
const port = 3000;
app.listen(port, () => {
	console.log('Server started on port ' + port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;