const mongoose = require('mongoose');

mongoose.model('Customer', {
    //Title, auther, totalPages, publisher
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: false
    },
    address: {
        type: String,
        require: false
    }
})