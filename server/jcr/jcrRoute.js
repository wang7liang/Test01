/**
 * Created by wang7liang on 2018/3/10.
 */
let path = require('path');
var http = require('http');
var request = require('request')

module.exports = function(app){


    app.post('/api/main/jcr/file/upload',function(req,res){
        req.pipe(request('http://127.0.0.1:9008/jcr/file/upload',function(error,response,body) {
            //console.log('代理返回的数据',body);
        })).pipe(res);
    });

    app.post('/api/main/jcr/file/confirm',function(req,res){
        var content = JSON.stringify(req.body);

        var request=http.request({
            host: '127.0.0.1',
            port: '9008',
            method:'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': Buffer.byteLength(content)
            },
            path: req.originalUrl.substr(9)
        }, function(response) {
            response.setEncoding('utf8');

            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                console.log(body);
                // res.writeHead(200, {'Content-Type': 'application/test;charset=utf-8'});
                res.end(body);

            });
        });
        request.write(content);
        request.end();
    });

    app.post('/api/main/jcr/nodes/scheme',function(req,res){
        let data = {
            success:true,
            content : {col: [
                    {title:'id', type:'string'},
                    {title:'name', type:'string'},
                    {title:'path', type:'string'},
                    {title:'type', type:'string'}
                    ]
            }
        }
        // setTimeout(function(){
            res.end(JSON.stringify(data));
        // },1000)

    });


    app.post('/api/main/jcr/nodes',function(req,res){
        var content = JSON.stringify({path:req.body.path});

        var request=http.request({
            host: '127.0.0.1',
            port: '9008',
            method:'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': Buffer.byteLength(content)
            },
            path: req.originalUrl.substr(9)
        }, function(response) {
            response.setEncoding('utf8');

            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                console.log(body);
                // res.writeHead(200, {'Content-Type': 'application/test;charset=utf-8'});
                res.end(body);

            });
        });
        request.write(content);
        request.end();

        // let data = '';
        // if(req.body.path=='/wang02'){
        //     data = {
        //         success:true,
        //         content : [
        //             {id:20,name:'上一页',path:'/',type:'nt:folder'},
        //             {id:21,name:'wang201',path:'/wang02/wang201',type:'type'},
        //             {id:22,name:'wang202',path:'/wang02/wang202',type:'type'},
        //             {id:23,name:'wang203',path:'/wang02/wang203',type:'type'}
        //         ]}
        // }else{
        //     data = {
        //         success:true,
        //         content : [
        //             {id:1,name:'wang01',path:'/wang01',type:'type'},
        //             {id:2,name:'wang02',path:'/wang02',type:'nt:folder'},
        //             {id:3,name:'wang03',path:'/wang03',type:'type'}
        //         ]}
        // }

        // res.end(JSON.stringify(data));
    });

}
