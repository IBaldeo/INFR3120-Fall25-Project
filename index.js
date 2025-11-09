const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/aboutme', (req, res) => {
  res.send('About Me')
})

app.get('/projectpage', (req, res) => {
  res.send('Project Page')
})

app.get('/contactme', (req, res) => {
  res.send('Contact Me')
})

app.listen(port, () => {
  console.log('Example app listening on port ${port}')
})