const express = require('express')
const fs = require('fs');
const multer = require('multer')
const app = express();
const port = 3000;
const path = './public/uploads'
const upload = multer({dest: path})
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.static(__dirname + '/public'))
let photosArr = []

app.get('/', (req, res) => {
    fs.readdir(path, function (err, items) {
        items.forEach(function (item) {
            if (photosArr.includes(`<img src="/uploads/${item}">`) === false 
            && item != '.DS_Store') 
            {
                console.log(photosArr)
                photosArr.push(`<img src="/uploads/${item}">`)
            }
        })
        let joinedPhotosArr = photosArr.join('')
        res.render("head", {photos: `${joinedPhotosArr}` }
            // `<!DOCTYPE html>
            // <html lang="en">
            // <head>
            // <meta charset="UTF-8">
            // <meta name="viewport" content="width=device-width, initial-scale=1.0">
            // <meta http-equiv="X-UA-Compatible" content="ie=edge">
            // <link rel="stylesheet" href="style.css">
            // <title>Kenziegram</title>
            // </head>
            // <body>
            // <form id="user-create-form" action="/upload" method="post" enctype="multipart/form-data">
            
            // <fieldset id="yourInfo">
            
            // <legend>Welcome To Kenziegram!</legend>
            
            // <label for="myFile">Upload an image:</label>
            // <input type="file" id="myFile" name="myFile" />
            // <br>
            // <br>
            
            // <button type="submit">Submit</button>
            // <button type="reset">Reset</button>
            
            // </fieldset>
            // </form>
            // <div id="photosDiv">
            // ${joinedPhotosArr}
            // </div>
            // </body>
            // </html>`
        )
    });
})

app.post('/upload', upload.single('myFile'), function (request, response, next) {
    // request.file is the `myFile` file
    // request.body will hold the text fields, if there were any
    photosArr.push((`<img src="/uploads/${request.file.filename}">`))
    response.end(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Kenziegram</title>
    </head>
    <body>
    <img src="/uploads/${request.file.filename}">
    <p>You successfully uploaded your image</p>
    <a href="/">
    <button id="homepage" name="homepage" type="submit">Return To Homepage</button>
    </a>
    </body>
    </html>`)
  })




app.listen(port)
console.log('server started')