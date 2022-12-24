const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://localhost:27017/localStrtegy');
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true,
    },

    lastName : {
        type : String,
        require : true,
    },

    email : {
        type : String,
        require : true,
        unique : true
    },

    password : {
        type : String,
        require : true,
    },
});

const user = connection.model('UserDB',userSchema);
module.exports = user;

// Session Storage

