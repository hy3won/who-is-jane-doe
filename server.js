const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload");

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get("/", (req, res) => {
    res.sendFile(path.join(initial_path, "uploads/home.html"))
})

app.get("/first", (req, res) => {
    res.sendFile(path.join(initial_path, "uploads/first.html"))
})

app.get("/stage1", (req, res) => {
    res.sendFile(path.join(initial_path, "uploads/stage1.html"))
})

//upload link
app.post("/upload", (req, res) => {
    let file = req.files.image;
    let date = new Date();
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = "/uploads/" + imagename;

    //create upload
    file.mv(path, (err, result)=> {
        if(err) {
            throw err;
        } else {
            //our image upload path
            res.json("uploads/${imagename}")
        }
    })
})
app.listen("3000", () => {
    console.log("listening......")
})