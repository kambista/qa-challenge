const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

app.use('/static', express.static(__dirname + '/public'))

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.listen(port, () => {
    console.log('Server listen port: ', port)
})