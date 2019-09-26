const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
require('./Book');

const Book = mongoose.model('Book');

mongoose.connect('mongodb://libuser:test123@ds133137.mlab.com:33137/mybooks', (err) => {
    if (!err) 
        console.log('mongoose connection successful!')
})
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('this is root endpoint in books service');
});

//create book
app.post('/book', (req, res) => {
    var book = new Book(req.body);
    console.log(req.body);
    book.save()
        .then((b) => {
            console.log('saved book ', b);
            res.send("New Book is created.");
        })
        .catch(err => {
            if (err) 
                throw err;
        });
});

app.get('/books', (req, res) => {
    Book.find().then((books) => {
        console.log('books ', books);
        res.json(books);
    }).catch(err => {
        if (err)
            throw err;
    });
});

//Get book by id
app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then(book=> {
        res.json(book);
    }).catch(err => {
        if(err)
            throw err;
    });
});

app.delete('/book/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id).then(book => {
        res.json(book);
    }).catch(err => {
        if(err)
            throw err;
    });
});

app.listen(4545, (err) => {
    if(!err)
        console.log('server is up and running - This is books service');
    else
        console.log('error ', err.json());
});