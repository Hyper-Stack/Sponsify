if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localstrategy = require("passport-local");
const app = express();
const Manager = require("./models/manager");
const Sponsor = require("./models/sponsor");
const {
  isMLoggedIn,
  isSLoggedIn,
  requireSlogin,
  requireMlogin,
} = require("./middleware");
const managerRoutes = require("./routes/manager");
const sponsorRoutes = require("./routes/sponsors");
const mailRoute = require("./routes/mailRoute");
const bcrypt = require("bcryptjs");
const { MongoStore } = require("connect-mongo");
const MongoDBStore = require("connect-mongo")(session);
//const MongoStore = require('connect-mongo')(session);
const DBURL = process.env.dbURL;

var cookieParser = require("cookie-parser");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// const store = new MongoStore({
//     url : dbUrl,
//     secret : 'mysecret',
//     touchAfter: 24*60*60
// })

// store.on("error", function(e){
//     console.log("SESSION STORE ERROR", e)
// })
const store = new MongoDBStore({
  url: DBURL,
  secret: "mysecret",
  touchAfter: 24 * 3600,
});
store.on("error", function (e) {
  console.log("error", e);
});
const sessionconfig = {
  store,
  name: "session",
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionconfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// passport.use(new localstrategy(Manager.authenticate()));
// passport.serializeUser(Manager.serializeUser());
// passport.deserializeUser(Manager.deserializeUser());
// passport.use(new localstrategy(Sponsor.authenticate()));
// passport.serializeUser(Sponsor.serializeUser());
// passport.deserializeUser(Sponsor.deserializeUser());
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});
app.use("/manager", managerRoutes);
app.use("/sponsors", sponsorRoutes);
app.use("/", mailRoute);

mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Database Connected");
});

app.get("/", function (req, res) {
  res.render("home");
});

// app.post('/sponsor/register', async function (req, res) {
//     const { email, username, password } = req.body;
//     const user = new Sponsor({ email, username });
//     const registeredUser = await Sponsor.register(user, password);
//     req.login(registeredUser, function (err) {
//         if (err) return next(err);
//         req.flash('success', 'Welcome')
//         res.redirect('/sponsor')
//     })
// })
// app.post('/sponsor/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/sponsor/register' }), async function (req, res) {
//     req.flash('success', 'Welcome back')
//     const url = req.session.returnto || '/sponsor'
//     delete req.session.returnto;
//     res.redirect(url)
// })
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`On port ${port}`);
});
