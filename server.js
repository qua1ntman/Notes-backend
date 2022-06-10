const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cors=require('cors');

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(bodyParser.json());     

app.get('/notes', (req, res) => {
    let data = ''
    const read = fs.createReadStream(path.join(__dirname, 'db.json'))
    read.on('data',  (chunk) => {
        data+=chunk
    })
    .on('end', function () {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(data)
    })
})

app.post('/notes', (req, res) => {
    console.log(req.body)
    let reqStr = JSON.stringify(req.body)
    res.send(reqStr)
    fs.writeFile(path.join(__dirname, 'db.json'), reqStr, (err) => console.log(err))
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
