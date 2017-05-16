var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// console.log(mime.lookup('/public/js/1.js'));
// console.log(mime.lookup('/public/css/bootstrap.css'));
// console.log(mime.lookup('/public/a.jpg'));

var server = http.createServer();
server.on('request',function(req,res){
    // console.log(req.url);
    // console.log(req.method);
    var url = req.url;
    var method = req.method;
    
    // res.write('你请求的路径是:'+req.url+',你请求的方法是:'+req.method);
    if(url === '/'){
        // res.write('你访问的是首页');
        fs.readFile(path.join(__dirname,'views/index.html'),function(err,data){
            if(err)throw err;
            res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
            res.write(data);
            res.end();
        });
    }else if(url === '/add' && method === 'GET'){
        // res.write('你访问的添加音乐,get');
        // res.end();
        fs.readFile(path.join(__dirname,'views/add.html'),function(err,data){
            if(err)throw err;
            res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
            res.write(data);
            res.end();
        });
    }else if(url === '/add' && method === 'POST'){
        res.write('你访问的添加音乐,post');
        res.end();
    }else if(url === '/edit' && method === 'GET'){
        // res.write('你访问的修改音乐,get');
        // res.end();
        fs.readFile(path.join(__dirname,'views/edit.html'),function(err,data){
            if(err)throw err;
            res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
            res.write(data);
            res.end();
        });
    }else if(url === '/edit' && method === 'POST'){
        res.write('你访问的修改音乐,post');
        res.end();
    }else if(url === '/delete'){
        res.write('你访问的删除音乐');
        res.end();
    }else if(url.startsWith('/public') || url.startsWith('/uploads')){
        // res.write('静态文件');
        fs.readFile(path.join(__dirname,decodeURIComponent(url)),function(err,data){
            if(err)throw err;
            res.writeHead(200,{'Content-Type':mime.lookup(url)});
            res.write(data);
            res.end();
        });
        
    }  
});
server.listen(3000,function(){
    console.log('服务器创建成功,正在监听端口3000');
});
