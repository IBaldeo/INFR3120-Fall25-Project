// require module
var connect = require('connect')
// create app
var app = connect()

function helloworld(req, res, next) 
{
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
}

app.use('/hello', helloworld)
app.listen(3000)
console.log('Server is running on local host')