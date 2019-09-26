const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const axios = require('axios');

require('./Order');

const Order = mongoose.model('Order');

mongoose.connect('mongodb://libuser:test123@ds235418.mlab.com:35418/myorders', (err) => {
    if (!err) console.log('mongoose connection successful!')
})
app.use(bodyParser.json());

var catcher = (err) => {
    if (err)
        throw err;
};

app.get('/', (req, res) => {
    res.send('this is root endpoint in order service');
});


//create new order
app.post('/order', (req, res) => {
    Order.findOne({
        customerId: mongoose.Types.ObjectId(req.body.customerId), 
        bookId: mongoose.Types.ObjectId(req.body.bookId) 
    }).then(order => {
        if (order) {
            res.send('This order already exists.')
        } else {
            var newOrder = new Order({
                customerId: mongoose.Types.ObjectId(req.body.customerId), 
                bookId: mongoose.Types.ObjectId(req.body.bookId),
                orderDate: req.body.orderDate,
                deliveryDate: req.body.deliveryDate 
            });
            newOrder.save(newOrder)
                .then(newOrder => res.json(newOrder))
                .catch(err => console.log(err));
        }
    }).catch(catcher);
});


//Getting all order by id
app.get('/orders', (req, res) => {
    Order.find()
        .then((orders) => {
            res.json(orders);
        })
        .catch(catcher);
});

//Getting all order by id
app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id)
        .then((order) => {
            if (order) {
                let orderDetail = {customerName: '', bookTitle: ''}
                axios.get('http://localhost:5555/customer/' + order.customerId)
                    .then(customerResponse => {
                        orderDetail.customerName = `${customerResponse.data.firstName} ${customerResponse.data.lastName}`;
                        axios.get('http://localhost:4545/book/' + order.bookId)
                            .then(bookResponse => {
                                orderDetail.bookTitle = bookResponse.data.title;
                                res.json(orderDetail);
                            })
                    })
            }
            else 
                res.send('Invalid order id.');
        })
        .catch(catcher);
});

//Deleting ORDER by id
app.delete('/order/:id', (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then((order) => {
            if (!order)
                res.send('Invalid order id');
            else 
                res.send(`${order.id} has been deleted.`);
        })
        .catch(catcher);
});

app.listen(7777, (err) => {
    if(!err)
        console.log('server is up and running - This is order service');
    else
        console.log('error ', err.json());
});