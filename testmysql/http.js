var http = require('http');
var Event = require('events').EventEmitter;
var querystring = require('querystring');
var url = require('url');
var fs = require('fs');

var mysql = require('mysql');

var mysql_user = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_sql'
};

var connection = mysql.createConnection(mysql_user);

connection.connect(function(err) {
    if (err) {
        console.log('[错误]' + err);
        connection.end();
        return;
    };
    console.log('链接成功');
});

var query = new Event();

query.on('login', function(username, password, connection) {
    var find = 'SELECT * FROM userinfo WHERE UserName = ' + username;

    connection.query(find, function(err, result) {
        if (err) {
            console.log('[错误]' + err);
            return;
        };

        if (result.length) {
            console.log('------------start----------------');
            var string = JSON.stringify(result);
            var json = JSON.parse(string)[0];
            console.log(string)
            if (json.UserPass == password) {
                console.log('密码校验正确');
            } else {
                console.log('密码校验错误');
            }
            console.log('--------------end-----------------');
        } else {
            console.log('账号不存在')
        }
    })
})

query.on('regsiter', function(username, password, connection) {
    var find = 'SELECT * FROM userinfo WHERE UserName = ' + username;
    var insert = 'INSERT INTO userinfo (Id,UserName,UserPass) VALUES (0,?,?)';

    connection.query(find, function(err, result) {
        if (err) {
            console.log('[错误]' + err);
            return;
        };
        console.log(result)
        if (result.length) {
            console.log('账号已存在');
            return;
        } else {
            var inserInfo = [username, password];
            connection.query(insert, inserInfo, function(err, result) {
                if (err) {
                    console.log('[注册错误]' + err);
                    return;
                };
                console.log('------------start----------------');
                console.log('注册成功');
                console.log(result);
                console.log('--------------end-----------------');
            })
        }
    });
})


http.createServer(function(req, res) {
    if (req.url == '/favicon.ico') {
        return;
    }
    var pathname = url.parse(req.url).pathname;
    var body = '';

    req.on('data', function(chunk) {
        body = '';
        body += chunk;
        body = querystring.parse(body);
    });

    fs.readFile(pathname.substring(1) + '.html', function(err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.write('404页面不存在');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=urf-8'
            });

            if (body) {
                switch (pathname) {
                    case '/login':
                        query.emit('login', body.username, body.password, connection);
                        break;
                    case '/regsiter':
                        query.emit('regsiter', body.username, body.password, connection);
                        break;
                }
            };

            res.write(data);
        };
        res.end();
    })

}).listen(3000);