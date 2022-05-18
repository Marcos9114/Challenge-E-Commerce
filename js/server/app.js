const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Word");
});

app.post("/upload", (req, res) => {
    console.log(req.files.file);
    res.send(`Archivo ${req.files.file.name} subido correctamente al servidor`)
})

app.listen(3000, () =>{
    console.log("Server running on port 3000")
})