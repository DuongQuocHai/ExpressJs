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


app.get('/', function(req, res){
    res.render("index", {
        name: 'Hai'
    });
})

app.get('/todos', function(req, res){
    res.render('./todos/index',{
        todos:[
            {id:1, todo:'Đi chợ'},
            {id:2, todo:'Nấu cơm'},
            {id:3, todo:'Rửa bát'},
            {id:4, todo:'Học tại CodersX'}
        ]
    });
})

app.listen(port, function(){
    console.log('server listening on port', port); 
})

