import express from 'express'
const app = express();

const port = 6868
const hostname = 'localhost'

app.get('/',(req, res)=>{
  res.send(`<h1>This is Thuandang and hello NodeJs world</h1>`)
})

app.listen(port,hostname,(res)=>{
  console.log(`First api call host: ${hostname}:${port}`)
})