const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "root",
  database: "kumaaraso",
  port: 3306,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

// add the path of the audio file to the database
function add_entry(call_id, pathUrl) {
  const sql = `INSERT INTO audio (call_id, path) VALUES ('${call_id}', '${pathUrl}')`;

  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

// list all audio files in the database
function listAudioFiles(callback) {
  const sql = "SELECT call_id, path FROM audio";

  conn.query(sql, (err, rows) => {
    if (err) {
      console.error("Error retrieving audio files:", err);
      callback(err, null);
    } else {
      const audioFiles = rows.map((row) => {
        const callId = row.call_id;
        const timestamp = callId.slice(-19); // Extract the timestamp part from the callId
        const caller = '+' + callId.slice(0, -20); // Extract the caller number part from the callId
        const pathUrl = row.path;
        const language = extractLanguageFromPathUrl(pathUrl); // Extract the language from the path URL

        return { caller, timestamp, pathUrl, language };
      });

      callback(null, audioFiles);
    }
  });
}

// extract the language from the path URL
function extractLanguageFromPathUrl(pathUrl) {
    const parts = pathUrl.split("%2F");
    const language = parts[1];
    return language;
}

// add the path of the radio recording to the database
function add_radio_entry(file_id, pathUrl) {
  const sql = `INSERT INTO radio (file_id, path) VALUES ('${file_id}', '${pathUrl}')`;

  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

// list all radio files in the database
function listRadioFiles(callback) {
  const sql = "SELECT file_id, path FROM radio";

  conn.query(sql, (err, rows) => {
    if (err) {
      console.error("Error retrieving radio files:", err);
      callback(err, null);
    } else {
      const radioFiles = rows.map((row) => {
        const file = row.file_id.slice(0, -4);
        const timestamp = file.slice(-19);
        const fileId = file.slice(0, -20);
        const pathUrl = row.path;
        const language = extractLanguageFromPathUrl(pathUrl); // Extract the language from the path URL

        return { fileId, timestamp, pathUrl, language };
      });

      callback(null, radioFiles);
    }
  });
}

function remove_radio_entry(file_id) {
  const sql = `DELETE FROM radio WHERE file_id = '${file_id}'`;

  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log("1 record deleted");
  });
}


module.exports = { conn, add_entry, listAudioFiles, add_radio_entry, listRadioFiles, remove_radio_entry };
