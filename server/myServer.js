/**
 * Created by wang7liang on 2018/3/10.
 */
let path = require('path');
let myExpress = require('./myExpress.js');

let app = new myExpress();
app.setPublic(path.join(__dirname,'../public'));

app.get('/*',function(req,res){
    res.end();
});

app.post('/',function(req,res){
    res.end();
});

app.start(8888);