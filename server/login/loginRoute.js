/**
 * Created by wang7liang on 2018/3/10.
 */
let path = require('path');

module.exports = function(app){

    app.get('/*',function(req,res){
        console.log(path.join(__dirname,'../../public/index.html'));
        res.sendFile(path.join(__dirname,'../../public/index.html'));
    });


    app.post('/api/login',function(req,res){
        res.end(JSON.stringify({isSuccess: true, message: 'Welcome.'}));
        // if("wang7liang" == req.body.username && "111111" == req.body.passwrod){
        //     res.end(JSON.stringify({isSuccess: true, message: 'Welcome.'}));
        // }else{
        //     res.end(JSON.stringify({isSuccess: false, message: '用户名密码不对'}));
        // }
    });

}
