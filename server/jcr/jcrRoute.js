var http = require('http');

/**
 * Created by wang7liang on 2018/3/10.
 */
let path = require('path');

module.exports = function(app){


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

        //
        //
        // let data = {
        //     isSuccess:true,
        //     content : [
        //         {id:1,name:'wang01'},
        //         {id:2,name:'wang02'},
        //         {id:3,name:'wang03'}
        //     ]}
        // res.end(JSON.stringify(data));
    });

}
