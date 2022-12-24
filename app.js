const { application } = require('express');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const routes = require('./routes/routes')
const ejs = require('ejs');
const MongoStore = require('connect-mongo');
const app = express();


app.use(session({
    secret: "random",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/localStrtegy',
        collectionName : 'sessions'
}),
    cookie : {
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(3000,()=>console.log("Server started"));
