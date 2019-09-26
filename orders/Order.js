const mongoose = require('mongoose');

mongoose.model('Order', {
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    orderDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    }
})