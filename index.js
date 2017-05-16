var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
    res.write('Hello World');
    res.end();
});
server.listen(3000,function(){
    console.log('服务器创建成功,正在监听端口3000');
});
