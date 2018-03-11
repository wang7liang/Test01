/**
 * Created by wang7liang on 2018/3/10.
 */
let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');

module.exports = class myExpress{

    constructor(){
        this.getpostarr = [];
        this.publicpath = 'public';
    }

    setPublic(publicpath){
        this.publicpath = publicpath;
    }

    receive(method,pathname,req,res){
        //console.log('router接收到：'+pathname);

        if(pathname.endsWith('js') || pathname.endsWith('css') || pathname.endsWith('html')){
            fs.readFile(path.join(this.publicpath,pathname),function(err,data){
                if(err){
                    console.log(err);
                    // HTTP 状态码: 404 : NOT FOUND
                    // Content Type: text/plain
                    res.writeHead(404, {'Content-Type': 'text/html'});
                }else{
                    // HTTP 状态码: 200 : OK
                    // Content Type: text/plain
                    res.writeHead(200, {'Content-Type': 'text/html'});

                    // 响应文件内容
                    res.write(data.toString());
                }
                res.end();
            });
        }else{
            this.getpostarr.forEach(function(getpost){
                //console.log('getpost：'+JSON.stringify(getpost));
                if(method == getpost.type && pathname == getpost.path){
                    getpost.fun(req,res);
                }
            })
        }
    }

    get(pathname,action){
        this.getpostarr.push({type:'GET',path:pathname,fun:action});
    }

    post(pathname,action){
        this.getpostarr.push({type:'POST',path:pathname,fun:action});
    }



    start(port){
        let self = this;
        http.createServer(function(req,res){
            let urlParse = url.parse(req.url);
            //console.log(JSON.stringify(urlParse));
            self.receive(req.method,urlParse.pathname,req,res);
        }).listen(port);
    }
}

