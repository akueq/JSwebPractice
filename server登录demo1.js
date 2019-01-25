// 用户注册、登录
//
// 接口
// /user?act=reg&user=aaa&pass=123456
//         ["ok":false,"msg":"原因"]
//
// /user?act=login&user=aaa&pass=123456
//         ["ok":true,"msg":"原因"]
//
// 要至少有两种访问 一个是对接口的访问，一个是对文件的访问
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urltib = require('url');
const express = require('express');
const request = require('request');

var users = {"aaa": 123, "bbb": 456};
//{"blue":123456,"red":234123}
//   名字：  密码                 结构就这样

let app = express();

//静态文件
app.use(express.static('www'));

app.use('/user', function (req, res) {


    console.log("进入了/user\n");
    var obj = urltib.parse(req.url, true);
    var str="";
    const url = obj.pathname;
    console.log("url:"+url);
    const GET = obj.query;
    // const POST = querystring.parse(str);

    switch (GET.act) {
        case 'reg':
            //1.检查用户名是否已经有了
            if (users[GET.user]) {
                res.write('{"ok":false,"msg":"此用户已存在"}');
                // str="[\"ok\":false,\"msg\":\"此用户已存在\"]";
            } else {
                users[GET.user] = GET.pass;
                res.write('{"ok":true,"msg":"注册成功"}');
                // str="[\"ok\":true,\"msg\":\"注册成功\"]";
                console.log("users:"+users);
            }
            break;
        case 'login':
            //1.检查用户名是否存在
            if (users[GET.user] == null) {
                console.log("GET.user:"+GET.user);
                res.write('{"ok":false,"msg":"此用户不存在"}');
                // str="[\"ok\":false,\"msg\":\"此用户不存在\"]";
            } else if (users[GET.user] != GET.pass) {
                //2.检查用户密码
                res.write('{"ok":false,"msg":"用户名或密码有误"}');
                // str="[\"ok\":false,\"msg\":\"用户名或密码有误\"]"
            } else {
                res.write('{"ok":true,"msg":"登录成功"}');
                // str="[\"ok\":true,\"msg\":\"登录成功\"]";
            }
            break;
        default:
            res.write('{"ok":false,"msg":"未知的act"}');
            // str="[\"ok\":false,\"msg\":\"未知的act\"]";
    }
})


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("\n应用实例，访问地址为 http:// %s : %s ", host, port);
});


// var server = http.createServer(function (req, res) {
//     //解析数据
//     var str = "";
//     req.on('data', function (data) {
//         str += data;
//     });
//     req.on('end', function () {
//
//         // console.log("str:"+str);
//
//         var obj = urltib.parse(req.url, true);
//         const url = obj.pathname;
//         console.log("url"+url);
//         const GET = obj.query;
//         const POST = querystring.parse(str);
//         //区分接口或者文件请求
//         if (url == '/user') {
//
//                 // console.log('22222');
//
//                 //接口
//                 switch (GET.act) {
//                     case 'reg':
//                         //1.检查用户名是否已经有了
//                         if (users[GET.user]) {
//                             res.write('{"ok":false,"msg":"此用户已存在"}');
//                         } else {
//                             users[GET.user] = GET.pass;
//                             res.write('{"ok":true,"msg":"注册成功"}');
//                             console.log("user:"+users);
//                         }
//                         break;
//                     case 'login':
//                         //1.检查用户名是否存在
//                         if (users[GET.user] == null) {
//                             console.log("GET.user"+GET.user);
//                             res.write('{"ok":false,"msg":"此用户不存在"}');
//                         } else if (users[GET.user] != GET.pass) {
//                             //2.检查用户密码
//                             res.write('{"ok":false,"msg":"用户名或密码有误"}');
//                         } else {
//                             res.write('{"ok":true,"msg":"登录成功"}');
//                         }
//                         break;
//                     default:
//                         res.write('{"ok":false,"msg":"未知的act"}');
//                 }
//                 res.end();
//             }
//             else {
//
//                 console.log("wenjian");
//
//                 //读取文件
//                 var file_name = './www' + url;
//                 fs.readFile(file_name, function (err, data) {
//                     if (err) {
//                         res.write("404");
//                     } else {
//                         res.write(data);
//                     }
//                     res.end();
//                 });
//             }
//         }
//     );
//
// });
//
// server.listen(8080);