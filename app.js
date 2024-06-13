// These lines import necessary modules:
const express = require("express"); //   express: To create the server and handle routes.
const app = express();
const fs = require("fs");                          //    fs: For file system operations like writing files.
const path = require("path");       //     path: For handling file paths.
const { spawn } = require('child_process');       //     child_process.spawn: For spawning a Python child process.

// Multer Configuration:
// multer -- (image upload)
const multer = require("multer"); //   multer: For handling file uploads.

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'model/Images')
    },
    filename: (req, file, cb)=>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage: storage});
//const port = process.env.port | 3001;
const port = process.env.PORT || 3001;

process.env.PYTHONIOENCODING = 'utf-8';
app.post('/Predict', upload.single("chooseFile"), (req, res)=>{
    console.log(`Image Path: ${req.file.path}`);
    const modelProcess = spawn('python', ["model/scc1.py", req.file.path]);
    let responseData = '';
    modelProcess.stdout.on('data', (data)=>{
        console.log(data.toString());
        responseData += data.toString() ;
    });
    modelProcess.stderr.on('data', (data)=>{console.log(data.toString()); });
    modelProcess.on('close', (code)=>{console.log(`Child process exited with code ${code}`);
        const result = responseData.split("\n")[3];
        res.json({result});

        // Write the result to a JSON file
        const resultData = {result };
        const jsonFilePath = path.join(__dirname, 'result.json');
        fs.writeFile(jsonFilePath, JSON.stringify(resultData), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('JSON file has been saved.');
            }
        });
    });
});

app.use(express.static('webphase2'));
app.listen(port,()=>console.log(`Listening on Port ${port}`));


