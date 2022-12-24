const express = require('express')
const bcrypt = require('bcryptjs');
const ejs = require('ejs');
const user = require('../config/database');
const passport = require('passport');
const { application } = require('express');
const passportU = require('../config/passportU');


const isAuth = 
    passport.authenticate('local', {
    successRedirect: 'dashboard'
});



const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("index");
});

routes.get("/login", (req, res) => {
    res.render("login", {message: "Please Login"});
});

routes.get("/register", (req, res) => {
    res.render("register", {message: "Hello"});
});

//post routes

routes.post("/register", (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        res.render("register", { message: "Enter all detail" });
    }
    else if (password !== confirmPassword) {
        res.render("register", { message: "password don't matched" });
    }

    user.findOne({ email: email }, (err, data) => {
        if (err) throw err;
        if (data) {
            res.render("register", { message: "user already exist we are sorry fuck yourself" });
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(password, salt, (err, hashPassword) => {
                    if (err) throw err;

                    user({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password : hashPassword
                    }).save((err,data)=>{
                        if(err) throw err;
                        res.redirect("/login");
                    })
                })
            })
        }
    })
});

routes.post('/login', isAuth);

routes.get("/dashboard",(req,res)=>{
    if(req.isAuthenticated()) {
        res.render("dashboard");
    } else {
        res.redirect("/login");
    }
});

routes.get("/logout",(req,res)=>{
        req.logOut((err)=>{
            if(err) throw err
            res.redirect("/login");
        });
    // } else {
    //     res.redirect("/");
    // }
})

module.exports = routes;