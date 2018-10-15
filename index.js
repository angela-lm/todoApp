var express = require('express');
// 自定义模块 todocontroller
var todoController = require('./controller/todoController.js');
var app = express();
app.set('view engine','ejs');
app.use('/public',express.static('public'));
app.listen(3000);

todoController(app);