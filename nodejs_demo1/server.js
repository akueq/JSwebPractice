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

var users = {"aaa":123,"bbb":456};
//{"blue":123456,"red":234123}
//   名字：  密码                 结构就这样

var server = http.createServer(function (req, res) {
    //解析数据
    var str = "";
    req.on('data', function (data) {
        str += data;
    });
    req.on('end', function () {
        var obj = urltib.parse(req.url, true);
        const url = obj.pathname;
        console.log(url);
        const GET = obj.query;
        const POST = querystring.parse(str);
        //区分接口或者文件请求
        if (url == '/user') {

            console.log('22222');

            //接口
            switch (GET.act) {
                case 'reg':
                    //1.检查用户名是否已经有了
                    if (users[GET.user]) {
                        res.write('{"ok":false,"msg":"此用户已存在"}');
                    } else {
                        users[GET.user] = GET.pass;
                        res.write('{"ok":true,"msg":"注册成功"}');
                    }
                    break;
                case 'login':
                    //1.检查用户名是否存在
                    if (users[GET.name] == null) {
                        res.write('{"ok":false,"msg":"此用户不存在"}');
                    } else if (users[GET.user] != GET.pass) {
                        //2.检查用户密码
                        res.write('{"ok":false,"msg":"用户名或密码有误"}');
                    } else {
                        res.write('{"ok":true,"msg":"登录成功"}');
                    }
                    break;
                default:
                    res.write('{"ok":false,"msg":"未知的act"}');
            }
            res.end();
        } else {

            console.log("wenjian");

            //读取文件
            var file_name = './www' + url;
            fs.readFile(file_name, function (err, data) {
                if (err) {
                    res.write("404");
                } else {
                    res.write(data);
                }
                res.end();
            });
        }
    });

});

server.listen(8080);