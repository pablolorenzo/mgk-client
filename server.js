const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const basicAuth = require('express-basic-auth')

var user = process.env.USER;
var pass = process.env.PASS;


const app = express()

//here we are configuring dist to serve app files
/*
app.use(basicAuth({
    users: { user: pass }
}))*/

/*app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}))*/

app.use('/', serveStatic(path.join(__dirname, '/dist')))


// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)