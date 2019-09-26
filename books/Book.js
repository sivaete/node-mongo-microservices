const mongoose = require('mongoose');

mongoose.model('Book', {
    //Title, auther, totalPages, publisher
    title: {
        type: String,
        require: true
    },
    auther: {
        type: String,
        require: true
    },
    totalPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: true
    }
})