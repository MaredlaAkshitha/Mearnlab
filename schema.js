const mongoose = require('monoose')

const user = mongoose.schema({
    FirstName : {
        type : String,
        require : true
    },
    LastName : {
        type : string
    },
    password : {
        type : string,
        require : true,
        unique : true
    },
    Email : {
        type : string,
        require : true,
        unique : true
    },
    UserName : {
        type : String,
        required : true,
        unique  : true
    },
    password :{
        type : String,
        required : true
    }
})

const User = mongoose.model('users',user)
module.exports = User