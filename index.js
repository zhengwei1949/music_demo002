var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var template = require('art-template');
var arr = [
    {
        "id": 1,
        "title": "富士山下",
        "singer": "陈奕迅",
        "music": "陈奕迅 - 富士山下.mp3",
        "poster": "陈奕迅.jpg"
    },
    {
        "id": 2,
        "title": "石头记",
        "singer": "达明一派",
        "music": "达明一派 - 石头记.mp3",
        "poster": "达明一派.jpg"
    },
    {
        "id": 3,
        "title": "青城山下白素贞",
        "singer": "好妹妹乐队",
        "music": "好妹妹乐队 - 青城山下白素贞.mp3",
        "poster": "好妹妹乐队.jpg"
    },
    {
        "id": 4,
        "title": "友情岁月",
        "singer": "黄耀明",
        "music": "黄耀明 - 友情岁月.mp3",
        "poster": "黄耀明.jpg"
    },
    {
        "id": 5,
        "title": "梦里水乡",
        "singer": "江珊",
        "music": "江珊 - 梦里水乡.mp3",
        "poster": "江珊.jpg"
    },
    {
        "id": 6,
        "title": "Blowing In The Wind",
        "singer": "南方二重唱",
        "music": "南方二重唱 - Blowing In The Wind.mp3",
        "poster": "南方二重唱.jpg"
    },
    {
        "id": 7,
        "title": "女儿情",
        "singer": "万晓利",
        "music": "万晓利 - 女儿情.mp3",
        "poster": "万晓利.jpg"
    },
    {
        "id": 8,
        "title": "王馨平",
        "singer": "别问我是谁",
        "music": "王馨平 - 别问我是谁.mp3",
        "poster": "王馨平.jpg"
    },
    {
        "id": 9,
        "title": "五环之歌",
        "singer": "岳云鹏",
        "music": "岳云鹏,MC Hotdog - 五环之歌.mp3",
        "poster": "岳云鹏.jpg"
    }
];

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
        var html = template(path.join(__dirname,'views/index.html'), {
            arr:arr
        });
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.write(html);
        res.end();
        // console.log(html);

        // fs.readFile(path.join(__dirname,'views/index.html'),function(err,data){
        //     if(err)throw err;
        //     res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        //     res.write(data);
        //     res.end();
        // });
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
