//Server
const express = require('express')
const server = express()

const { pageLanding, pageStudy, pageGiveClasses, pageSaveClasses } = require('./pages')

//nunjucks configure (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
   express : server,
   noCache : true,
})

//Start and server configure
server
//Receive data from req.body
.use(express.urlencoded( {extended : true} ))
//configure static files (img, scripts, css)
.use(express.static("public"))
//configure application routes
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", pageSaveClasses)
//Server start
.listen(5500);
