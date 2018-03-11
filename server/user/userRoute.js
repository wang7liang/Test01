/**
 * Created by wang7liang on 2018/3/10.
 */
let path = require('path');

module.exports = function(app){

    app.post('/api/main/user/list',function(req,res){
        let data = {
            isSuccess:true,
            content : [
            {id:1,name:'wang01'},
            {id:2,name:'wang02'},
            {id:3,name:'wang03'}
        ]}
        res.end(JSON.stringify(data));
    });



}
