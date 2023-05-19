const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");

const {
  conn,
  add_entry,
  listAudioFiles,
  add_radio_entry,
  listRadioFiles,
} = require("./database/mysql-db");

const app = express();
const upload = multer();

const port = 3000;

app.use(cors());

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

// VXML requests

// add the path of the audio file to the database
app.post("/question", upload.single("question"), (req, res) => {
  console.log("POST request received");

  // remove the + sign from the caller number and add timestamp
  const timestamp = new Date().toISOString().slice(0, 19);
  const caller = req.body.caller.replace("+", "") + "_" + timestamp;
  const language = req.body.language;
  const infile = req.file.buffer;
  const outfile_name = `audio-recording/${language}/${caller}.wav`;

  // Upload the file to Google Cloud Storage
  const storage = new Storage();
  const bucketName = "kumaaraso-audio";
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(outfile_name);

  console.log("Uploading file to Google Cloud Storage...");
  console.log(`Caller: ${caller}`);
  console.log(`Language: ${language}`);
  console.log(`File name: ${outfile_name}`);

  blob.save(infile, (err) => {
    // Store the path URL in the DB for later retrieval
    const pathUrl = blob.publicUrl();
    add_entry(caller, pathUrl);
    fs.readFile(`./voice-xml/${language}/menu.xml`, (err, data) => {
      if (err) throw err;
      console.log("Sending response to client...", data);
      res.send(data);
    });
  });
});

app.get("/entry.xml", (req, res) => {
  console.log("entry.xml requested");
  fs.readFile("./voice-xml/entry.xml", (err, data) => {
    if (err) throw err;
    res.type("text/xml");
    res.status(200).send(data);
  });
});

app.get("/language.xml", (req, res) => {
  console.log("language.xml requested");
  fs.readFile("./voice-xml/language.xml", (err, data) => {
    if (err) throw err;
    res.type("text/xml");
    res.status(200).send(data);
  });
});

app.get("/questions-to-menu.xml", (req, res) => {
  console.log("questions-to-menu.xml requested");
  fs.readFile("./voice-xml/questions-to-menu.xml", (err, data) => {
    if (err) throw err;
    res.type("text/xml");
    res.status(200).send(data);
  });
});

function goToLanguageXML(url, res) {
  console.log("xml url requested - ", url);
  // split the url /en/farming.xml into 'en' and 'farming.xml'
  const url_split = url.split("/");
  const language = url_split[1];
  const xml_file = url_split[2];
  fs.readFile(`./voice-xml/${language}/${xml_file}`, (err, data) => {
    if (err) throw err;
    res.type("text/xml");
    console.log("sending xml file to client -", xml_file);
    res.status(200).send(data);
  });
}

app.get("/en/:xml_file", (req, res) => {
  goToLanguageXML(req.url, res);
});

app.get("/fr/:xml_file", (req, res) => {
  goToLanguageXML(req.url, res);
});

app.get("/bm/:xml_file", (req, res) => {
  goToLanguageXML(req.url, res);
});

function goToLanguageAudio(url, res) {
  // split the url /audio/en-welcome.wav into 'en' and 'en-welcome.wav'
  console.log("audio url requested - ", url);
  const audioFile = url.split("/")[2];
  const language = audioFile.split("-")[0];
  fs.readFile(`./voice-xml/${language}/audio/${audioFile}`, (err, data) => {
    if (err) throw err;
    res.type("audio/wav");
    console.log("sending audio file to client -", audioFile);
    res.status(200).send(data);
  });
}

// return the audio file to the client
app.get("/audio/:audioFile", (req, res) => {
  goToLanguageAudio(req.url, res);
});

// return the last 5 radio recordings to the vxml client
app.get("/radio-recordings", (req, res) => {
  listRadioFiles((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error", err);
    } else {
      // send the last 5 recordings according to the timestamp if 5 or more recordings exist
      // sort the data by timestamp
      data.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      // send the last 5 recordings if 5 or more recordings exist
      if (data.length >= 5) {
        data = data.slice(0, 5);
      }

      data = data.map((recording) => {
        return recording.pathUrl;
      });

      const response = { audioLinks: data };

      console.log("Sending data to client...", response);
      res.status(200).json(response);
    }
  });
});

// client side requests

// return the list of audio files to the client
app.get("/api/call-recordings", (req, res) => {
  listAudioFiles((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error", err);
    } else {
      console.log("Sending data to client...", data);
      res.status(200).json(data);
    }
  });
});

// upload the radio-recording audio file to the google storage bucket and add the path to the database
app.post("/api/radio-recordings", upload.single("recording"), (req, res) => {
  console.log("POST request received");

  const uploadedFile = req.file.buffer;
  const language = req.body.language;

  const timestamp = new Date().toISOString().slice(0, 19);
  const filename = uuidv4() + "_" + timestamp + ".wav";
  outfile_name = `radio-recording/${language}/${filename}`;

  // Upload the file to Google Cloud Storage
  const storage = new Storage();
  const bucketName = "kumaaraso-audio";
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(outfile_name);

  console.log("Uploading file to Google Cloud Storage...");
  console.log(`Language: ${language}`);
  console.log(`File name: ${filename}`);

  blob.save(uploadedFile, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error", err);
    }
    // Store the path URL in the DB for later retrieval
    const pathUrl = blob.publicUrl();
    add_radio_entry(filename, pathUrl);
    res.status(200).send("File uploaded successfully");
  });
});

// return the list of radio recordings to the client
app.get("/api/radio-recordings", (req, res) => {
  listRadioFiles((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error", err);
    } else {
      console.log("Sending data to client...", data);
      res.status(200).json(data);
    }
  });
});

// error handling and 404
app.use((req, res) => {
  console.log("URL not found - ", req.url);
  res.status(404).send("404: Page not found");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
