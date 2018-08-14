const express = require('express')
const fs = require('fs');
const multer = require('multer')
const app = express();
const port = 3000;
const path = './public/uploads'
const upload = multer({
    dest: path
})
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.static(__dirname + '/public'))
let photosArr = []

app.get('/', (req, res) => {
    fs.readdir(path, function (err, items) {
        items.forEach(function (item) {
            if (photosArr.includes(item) === false &&
                item != '.DS_Store') {
                    photosArr.push(item)
                }
            })
            console.log(photosArr)
        res.render("homePage", {photosArr}
        )
    });
})

app.post('/upload', upload.single('myFile'), function (request, response, next) {
    fileToUpload = request.file.filename
    photosArr.push(fileToUpload)
    response.render("uploadPage", {fileToUpload}
    )
})

app.post('/latest', (req, res) => {
    const latestPhotos = []
    let serverTimestamp = 0
    fs.readdir(path, function(err, items) {
        items.forEach(function(item){
            let modified = fs.statSync(path + '/' + item).mtimeMs;
            if(modified > req.after) {
                latestPhotos.push(item)
            }
            if(modified > serverTimestamp) {
                serverTimestamp = modified
            }
        })
        res.send({
            "images": latestPhotos,
            "timestamp": serverTimestamp
        })
    })

})



app.listen(port)
console.log('server started')