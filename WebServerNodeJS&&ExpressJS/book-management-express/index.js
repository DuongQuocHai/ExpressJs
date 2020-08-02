const express = require('express');
const app = express();
const port = 4000;

var bodyParser = require('body-parser')
const low = require('lowdb')
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.defaults({ listBooks: [] }).write()

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/books', (req, res) => {
    res.render('books/index', {
        listBooks: db.get('listBooks').value()
    })
})



app.get('/books/:id/delete', (req, res) => {
    var id = req.params.id;
    db.get('listBooks').remove({ id: id }).write();
    res.redirect('/books')
})

app.get('/books/:id', (req, res) => {
    var id = req.params.id;
    var book = db.get('listBooks').find({ id: id }).value();
    res.render('books/view', {
        book: book
    });
})

app.get('/books/search', (req, res) => {
    var title = req.query.title;
    var matchedTodos = db.get('listBooks').value().filter((book) => {
        return book.title.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) !== -1;
    })
    res.render('books/index', {
        listBooks: matchedTodos
    })
})

app.post('/books/add', (req, res) => {
    req.body.id = shortid.generate();
    db.get('listBooks').push(req.body).write();
    res.redirect('/books')
})


app.post('/books/:id/update', (req, res) => {
    var id = req.params.id;
    console.log(id)
    console.log(req.body)
    db.get('listBooks')
        .find({ id: id })
        .assign(req.body)
        .write();
    res.redirect('/books')
})

app.listen(port, () => {
    console.log('server listening on port ' + port);
})