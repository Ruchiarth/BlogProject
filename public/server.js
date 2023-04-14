

const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');



let initial_path = path.join(__dirname,"");

// Set up the server

const app = express();

app.use(express.static(initial_path));
app.use(fileUpload())

app.get('/',(req, res)=> {
    res.sendFile(path.join(initial_path,"home.html"));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

// upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'uploads/' + imagename;
    console.log(" serverjs: path: ",path)

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000",()=>{
    console.log('listening....');
});


