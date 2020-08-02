const express = require('express');
const app = express();

// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync('db.json')
// const db = low(adapter)
// db.defaults({ todos: []}).write()

const port = 3000
app.set('view engine', 'pug');
app.set('views', './views');

const todos = [
    { id: 1, todo: 'Đi chợ' },
    { id: 2, todo: 'Nấu cơm' },
    { id: 3, todo: 'Rửa bát' },
    { id: 4, todo: 'Học tại CodersX' }
]


app.get('/', function (req, res) {
    res.render("index", {
        name: 'Hai'
    });
})

app.get('/todos', function (req, res) {
    res.render('todos/index', {
        todos: todos
    });
})

app.get('/todos/search', (req, res) => {
    var q = req.query.q;
    var matchedTodos = todos.filter((todo) => {
        return todo.todo.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    })

    res.render('todos/index', { 
        todos: matchedTodos
    })
    console.log(req.query);
})

app.listen(port, function () {
    console.log('server listening on port', port);
})

