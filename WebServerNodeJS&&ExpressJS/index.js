const express = require('express');
const app = express();
var bodyParser = require('body-parser')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ todos: []}).write()

const port = 3000
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const todos = db.get('todos')

app.get('/', function (req, res) {
    res.render("index", {
        name: 'Hai'
    });
})

app.get('/todos', function (req, res) {
    res.render('todos/index', {
        todos: todos.value()
    });
})

app.get('/todos/search', (req, res) => {
    var q = req.query.q;
    var matchedTodos = todos.value().filter((todo) => {
        return todo.todo.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    })
    res.render('todos/index', {
        todos: matchedTodos
    })
    console.log(req.query);
})

app.get('/todos/create', function (req, res) {
    res.render('todos/create');
})
app.post('/todos/create', function (req, res) {
    todos.push(req.body).write();
    res.redirect('/todos');
})




app.listen(port, function () {
    console.log('server listening on port', port);
})

