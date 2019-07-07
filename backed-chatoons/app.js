require('dotenv').config()
var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bcrypt = require("bcryptjs");

const User = require("./models/user");
const mongoose = require("mongoose");
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config/config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const friendRouter = require("./routes/friendlist");
const authRoutes = require("./routes/auth");
const chatRouter = require("./routes/chat");
const imageUploadRouter = require("./routes/image-upload");
const passport = require("passport");
var app = express();

var LocalStrategy = require("passport-local").Strategy;

app.use(
  cors({
    credentials: true,
    origin: CLIENT_ORIGIN
  })
);
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, next) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(null, false, { message: "Incorrect username" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return next(null, false, { message: "Incorrect password" });
        }

        return next(null, user);
      }).catch(err => {
        console.log(err);
      });
    }
  )
);

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRoutes);
app.use("/users", usersRouter);
app.use("/friends", friendRouter);
app.use("/chat", chatRouter);
app.use("/content", imageUploadRouter);

// Connection to the database "chatoonsdb"
mongoose
  .connect("mongodb://localhost/chatoonsdb", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });



// ADD SESSION SETTINGS HERE:
app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  console.log(err);
});

module.exports = app;