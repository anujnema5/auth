const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const user = require('./database');

passport.use(new localStrategy({usernameField : "email"}, (email,password,done)=>{
    user.findOne({email : email},(err,data)=>{
        if(err) throw err;
        if(!data) {
            return done(null,false ,{message : "User does not exist"});
        }
        bcrypt.compare(password, data.password, (err,match)=>{
            if(err) {
                return done(null,false);
            }
            if(!match) {
                return done(null,false);
            }

            if(match) {
                return done(null,data);
            }
        })
    })
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
    console.log(user.id);
});

passport.deserializeUser((id,done)=>{
    user.findById(id, (err,user)=>{
        done(err,user);
    })
});

