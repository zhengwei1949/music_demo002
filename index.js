// var fs = require('fs');
// var path = require('path');
//有二个用途：重命名文件 移动文件
// fs.rename(path.join(__dirname,'a.txt'),path.join(__dirname,'ceshi/b.txt'),function(err){
//     if(err)throw err;
//     console.log('文件移动成功');
// });



var http = require('http');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring'); //a=1&b=2
var mime = require('mime');//根据文件扩展名来解析出来对应的content-type
var template = require('art-template');
var formidable = require('formidable');
var util = require('util');
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
        "title": "王馨平",//fields.title
        "singer": "别问我是谁",//fields.singer
        "music": "王馨平 - 别问我是谁.mp3",//files.music.name
        "poster": "王馨平.jpg"//files.poster.name
    }
]; 


// arr.length + 1
//求出最后一项的id + 1
//求出来id最大值 +１

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
        //收集到前端浏览器填写的数据 --> 拼成一个对象，追加到数组里面去 ---> 跳转到首页
        // console.log(111);
        var form = new formidable.IncomingForm();
        //fields --> 代表普通的文本框的数据 
        //files --> 获取文件类型的数据
        // TODO:把获取到的表单数据拼成一个对象
        form.parse(req, function(err, fields, files) {
            if(err)throw err;
            // res.writeHead(200, {'content-type': 'text/plain;charset=utf8'});
            // res.write('接收到的表单数据:\n\n');
            //util.inspect把一些对象类型的数据能够转换成字符串 
            // res.end(util.inspect({fields: fields, files: files}));
            // console.log(files.music.path);
            // res.end('wfewfew')
            fs.rename(files.music.path,path.join(__dirname,'uploads/'+files.music.name),function(err){
                if(err)throw err;
                fs.rename(files.poster.path,path.join(__dirname,'uploads/'+files.poster.name),function(err){
                    if(err)throw err;
                    // console.log('success');
                    var tempId;
                    if(arr.length === 0){
                        tempId = 1;
                    }else{
                        tempId = arr[arr.length - 1].id + 1;
                    }
                    arr.push({
                        id:tempId,
                        title:fields.title,
                        singer:fields.singer,
                        music:files.music.name,
                        poster:files.poster.name
                    });
                    // res.writeHead(200,{'Content-Type':''});
                    res.writeHead(302,{'Location':'/'});
                    res.end();
                })
            });
        });
        // res.write('你访问的添加音乐,post');
        // res.end();
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
    }else if(url.startsWith('/delete')){ // /delete?   id=4&a=2
        var str = url.split('?')[1];
        // console.log(Number(querystring.parse(str).id));
        var index = Number(querystring.parse(str).id);
        arr.splice(index,1);
        // res.write(
        //     `
        //     <!DOCTYPE html>
        //     <html lang="en">
        //     <head>
        //         <meta charset="UTF-8"/>
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        //         <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        //         <title>Document</title>
        //     </head>
        //     <body>
        //         <script>
        //             location.href = "/";
        //         </script>
        //     </body>
        //     </html>
        //     `
        // );
        // res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.writeHead(302,{'Location':'/'});
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
