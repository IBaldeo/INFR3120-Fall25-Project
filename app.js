require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('./config/passport')(passport);

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


// API Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const incidentsRoutes = require('./routes/incidents');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentsRoutes);

// Production Angular build
app.use(express.static(path.join(__dirname, 'client/dist/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/client/browser/index.html'));
});

module.exports = app;

