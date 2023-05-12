const express = require("express");
const { conn, add_entry } = require("./mysql-db");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

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

// add the path of the audio file to the database
app.post("/", upload.single("question"),(req, res) => {
  console.log("POST request received");
  console.log(req.body);
  console.log('Files: ', req.files);
  console.log('File: ', req.file);

  // remove the + sign from the caller number and add timestamp
  const timestamp = new Date().toISOString().slice(0, 19);
  const caller = req.body.caller.replace("+", "") + "_" + timestamp;
  const infile = req.body.question.buffer;
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
    if (err) {
      console.error("Error uploading file:", err);
      res.status(500).send("Error uploading file");
    } else {
      // Store the path URL in the DB for later retrieval
      const pathUrl = blob.publicUrl();
      add_entry(pathUrl);
      res.status(200).send("File uploaded successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
