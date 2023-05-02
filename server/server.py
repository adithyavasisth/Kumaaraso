# create a flask api server to handle requests

from flask import Flask, request, jsonify
from flask_cors import CORS
from db import fetch_all, add_entry
from google.cloud import storage

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_all():
    # return the results from the DB
    return jsonify(fetch_all())

@app.route('/', methods=['POST'])
def upload_audio():
    caller = request.form['caller']
    # get the file from the request object
    infile = request.files['question'].stream.read()
    outfile_name = 'audio-recording/' + caller + '.mp3'
    
    # Upload the file to Google Cloud Storage
    storage_client = storage.Client()
    bucket_name = 'kumaaraso-audio'
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(outfile_name)
    blob.upload_from_string(infile)
    
    # store the path url in the DB
    path_url = blob.public_url
    add_entry(path_url)

if __name__ == '__main__':
    app.run(debug=True, port=5000)