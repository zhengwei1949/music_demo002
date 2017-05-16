## 学习目标
- 通过本案例学会如何使用一些第三方模块
- 通过本案例复习fs、path、querystring、http模块的用法
- 通过本案例训练自己做项目的思考过程
- 进一步复习art-template的用法
- 复习git、github的命令

## 需求分析
- 显示音乐列表
- 添加音乐
- 编辑音乐
- 删除音乐
 



## git命令
- `git init`
- `git remote add origin git@github.com:zhengwei1949/music_demo002.git`
- `git add .`
- `git commit -m "注释信息"`
- `git push -u origin master` 第一次 `git push`

## 分析练习素材
- uploads是一些上传的图片、mp3文件
- views是一些静态网页模板

## 更改练习素材文件夹的权限

用户通过不同的url地址来访问的话，我们的服务器就会返回不同的内容

localhost:3000/ --> 首页
/add --> 添加音乐

<form action="/add" method="POST">

</form>


我们的请求路径是一样的，但是还是可以规划出来二个路由
get 
post


## 路由规划
- / --> 显示音乐
- /add --> 添加音乐
    + method如果是get
    + method是post
- /edit --> 编辑音乐
    + method是get
    + method是post
- /delete --> 删除音乐


## 创建服务器，测试是否可以正常访问


## 创建路由代码，并用postman进行测试

## 添加首页html文件
- 测试不能正常访问一直在转圈 --> uploads作为静态资源文件夹 --> 创建一个assets文件夹用来放静态js,css

http://localhost:3000/public/js/1.js --> /public/js/1.js
http://localhost:3000/public/css/bootstrap.css --> /public/css/bootstrap.css
/public开头 --> 凡是以/public开头的req.url --> 都是静态文件


## 同样的思路把添加音乐、编辑音乐做出来

## 给音乐首页添加动态数据 --> art-template

## 删除功能


## 添加功能
