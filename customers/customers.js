const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
require('./Customer');

const Customer = mongoose.model('Customer');

mongoose.connect('mongodb://libuser:test123@ds015750.mlab.com:15750/mycustomers', (err) => {
    if (!err) console.log('mongoose connection successful!')
})
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('this is root endpoint in customer service');
});

//create new customer
app.post('/customer', (req, res) => {
    Customer.findOne({
        firstName: req.body.firstName, 
        lastName: req.body.lastName 
    }).then(customer => {
        if (customer) {
            res.send('This customer already exists.')
        } else {
            var newCustomer = new Customer(req.body);
            newCustomer.save(newCustomer)
                .then(newCustomer => res.json(newCustomer))
                .catch(err => console.log(err));
        }
    }).catch(err => {
        if (err)
            throw err;
    });
});

//Getting all customers
app.get('/customers', (req, res) => {
    Customer.find()
        .then((customers) => {
            res.json(customers);
        })
        .catch(err => {
            if (err) 
                throw err;
        });
});

//Getting customer by id
app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then((customer) => {
            if (customer)
                res.json(customer);
            else 
                res.send('Invalid customer id.');
        })
        .catch(err => {
            if (err) 
                throw err;
        });
});

//Deleting customer by id
app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then((customer) => {
            res.send(`${customer.firstName} ${customer.lastName} has been deleted.`);
        })
        .catch(err => {
            if (err) 
                throw err;
        });
});

app.listen(5555, (err) => {
    if(!err)
        console.log('server is up and running - This is customer service');
    else
        console.log('error ', err.json());
});