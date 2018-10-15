var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// 链接数据库；
mongoose.connect('mongodb://todoapp:todoapp123@ds030817.mlab.com:30817/angela_todo_database');
// 创建图表
var todoSchema = new mongoose.Schema({
    key: String,
    item: String,
    done: Boolean
});
//  往数据库中存储数据
var todo = mongoose.model('Todo',todoSchema);
var newData = {};
// 对数据进行解析
var urlencodeParser = bodyParser.urlencoded({extended: false});
var len = 0;
module.exports = function (app) {
    // 获取数据
    app.get('/',function (req,res){
        // res.send('您所访问的页面地址是' + __dirname + req.url);
        todo.find({},function(err,data){
            if(err) throw err;
            len = data.length;
            res.render('todo',{todos: data});
        })
    })
    // 传递数据
    app.post('/',urlencodeParser,function (req,res) {
        if(req.body.done){
            todo.update({key:req.body.key},{done: true},function(err,data) {
                if (err) throw err;
                res.json(data);
            });
        }else{
            newData = {key:len + '',...req.body,done: false};
            todo(newData).save(function (err,data) {
                if(err) throw err;
                res.json(data);
            })
        }
    })
    // 删除数据
    app.delete('/:key',function (req,res){
        todo.remove({key: req.params.key},function(err,data) {
            if(err) throw err;
            res.json(data);
        })
        // for(var i = 0; i < data.length; i++){
        //     if(data[i].key === req.params.key){
        //         data.splice(i,1);
        //     }
        // }
    })
}