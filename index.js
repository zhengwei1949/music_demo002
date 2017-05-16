var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
    // console.log(req.url);
    // console.log(req.method);
    var url = req.url;
    var method = req.method;
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
    // res.write('你请求的路径是:'+req.url+',你请求的方法是:'+req.method);
    if(url === '/'){
        res.write('你访问的是首页');
    }else if(url === '/add' && method === 'GET'){
        res.write('你访问的添加音乐,get');
    }else if(url === '/add' && method === 'POST'){
        res.write('你访问的添加音乐,post');
    }else if(url === '/edit' && method === 'GET'){
        res.write('你访问的修改音乐,get');
    }else if(url === '/edit' && method === 'POST'){
        res.write('你访问的修改音乐,post');
    }else if(url === '/delete'){
        res.write('你访问的删除音乐');
    }
    res.end();
});
server.listen(3000,function(){
    console.log('服务器创建成功,正在监听端口3000');
});
