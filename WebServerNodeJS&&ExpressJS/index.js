const express = require('express');
const app = express();
const port = 3000

const todos = "<ul><li>Đi chợ</li><li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại codersX</li></ul>";



app.get('/', function(req, res){
    res.send("<h1>hello</h1><a href='/todos'>todos</>");
})

app.get('/todos', function(req, res){
    res.send(todos);
})

app.listen(port, function(){
    console.log('server listening on port', port); 
})