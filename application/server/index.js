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

// add the path of the audio file to the database
app.post("/question", upload.single("question"), (req, res) => {
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

app.get("/entry.xml", (req, res) => {
  console.log('entry.xml requested')
  fs.readFile("./voice-xml/entry.xml", (err, data) => {
    if (err) throw err;
    res.type("text/xml");
    res.status(200).send(data);
  });
});

app.get("/language.xml", (req, res) => {
  console.log('language.xml requested')
  fs.readFile("./voice-xml/language.xml", (err, data) => {
    if (err) throw err;
    res.type("text/xml");
    res.status(200).send(data);
  });
});

app.get("/questions-to-menu.xml", (req, res) => {
  console.log('questions-to-menu.xml requested')
  fs.readFile("./voice-xml/questions-to-menu.xml", (err, data) => {
    if (err) throw err;
    res.type("text/xml");
    res.status(200).send(data);
  });
});

function goToLanguageXML(url, res) {
  console.log('xml url requested - ', url);
  // split the url /en/farming.xml into 'en' and 'farming.xml'
  const url_split = url.split("/");
  const language = url_split[1];
  const xml_file = url_split[2];
  fs.readFile(`./voice-xml/${language}/${xml_file}`, (err, data) => {
    if (err) throw err;
    res.type("text/xml");
    console.log('sending xml file to client -', xml_file);
    res.status(200).send(data);
  });
}

app.get('/en/:xml_file', (req, res) => {
  goToLanguageXML(req.url, res);
});

app.get('/fr/:xml_file', (req, res) => {
  goToLanguageXML(req.url, res);
});

function goToLanguageAudio(url, res) {
  // split the url /audio/en-welcome.wav into 'en' and 'en-welcome.wav'
  console.log('audio url requested - ', url);
  const audioFile = url.split("/")[2];
  const language = audioFile.split("-")[0];
  fs.readFile(`./voice-xml/${language}/audio/${audioFile}`, (err, data) => {
    if (err) throw err;
    res.type('audio/wav');
    console.log('sending audio file to client -', audioFile);
    res.status(200).send(data);
  });
}

// return the audio file to the client
app.get("/audio/:audioFile", (req, res) => {
  goToLanguageAudio(req.url, res);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
