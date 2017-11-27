var https = require('https');
var fs = require('fs');
var options = {
key: fs.readFileSync('e:/ssl/myserver.key'),
cert: fs.readFileSync('e:/ssl/myserver.crt'),
passphrase: '1234'
};
var server = https.createServer(options,function (req, res) {
res.write('Welcome to http nodejs');
res.end();
});
server.listen(8084);
console.log('Server is running on port 8084');
