const express = require("express");
const fs = require("fs");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const { conn, add_entry } = require("./database/mysql-db");

const app = express();
const upload = multer();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  conn.query("SELECT * FROM audio", (err, rows) => {
    if (err) throw err;
    console.log("Data received from DB:");
    res.status(200).send(rows);
  });
});

app.get('/xml', (req, res) => {
  fs.readFile('./voice-xml/questions-to-menu.xml', (err, data) => {
    if (err) throw err;
    console.log('Sending response to client...', data);
    res.type('text/xml');
    res.status(200).send(data);
  });
});

// add the path of the audio file to the database
app.post("/", upload.single("question"), (req, res) => {
  console.log("POST request received");

  // remove the + sign from the caller number and add timestamp
  const timestamp = new Date().toISOString().slice(0, 19);
  const caller = req.body.caller.replace("+", "") + "_" + timestamp;
  const infile = req.file.buffer;
  const outfile_name = `audio-recording/${caller}.wav`;

  // Upload the file to Google Cloud Storage
  const storage = new Storage();
  const bucketName = "kumaaraso-audio";
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(outfile_name);

  console.log("Uploading file to Google Cloud Storage...");
  console.log(`Caller: ${caller}`);
  console.log(`File name: ${outfile_name}`);

  blob.save(infile, (err) => {
    // Store the path URL in the DB for later retrieval
    const pathUrl = blob.publicUrl();
    add_entry(caller, pathUrl);
    fs.readFile("./voice-xml/questions-to-menu.xml", (err, data) => {
      if (err) throw err;
      console.log("Sending response to client...", data);
      res.send(data);
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
