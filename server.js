// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

const jsonData = {count: 12, message: 'hey'}

app.get('/', (req, res) => {
  fs.readFile('index.html', (err, buffer) => {
    const html = buffer.toString();
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
  // res.sendFile(path.join(__dirname + '/index.html'), err => {
  //   err && res.status(500).send(err)
  // })
})

app.get('/data', (req, res) => {
  res.json(jsonData)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})