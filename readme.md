## Name of the program: Kumaaraso
## Authors: Group 15
- Adithya
- Ruthu
- Sophie
- Eva
- Nina

The ```application``` folder is split into the following folder structure and files:

- ```docker-compose.yaml``` - Contains the configurations to run the docker images.
- ```Kumaaraso-radio-client``` - Contains the angular project to run the frontend client.
- ```Kumaaraso-radio-client/src/app``` - contains the components and services used to run the client.
- ```nginx``` - This folder contains the config for the NGINX reverse proxy.
- ```run.sh``` - This file can be run with the following code ``` ./run.sh ```
- ```server``` - This folder contains the backend server application built using the ExpressJS Framework.
- ```server/database```  - This folder contains the files that interact with the MySQL DB. The ```mysql-db.js``` contains the middleware that is used to interact with the DB. The ```mysql-init.sql``` contains the code that is used by the ```docker-compose.yaml```.
- ```translate-audio.sh```  - It contains the content that is used in the voice application - it auto converts the text to wav files.
- ```voice-xml``` - It contains all the voice xml files that is served by the server to the Voxeo platform.
- ```index.js``` - The express file that runs the REST API Server. Serves both the Frontend Client and the Voice Application. It also handles the interactions with the Google Storage Bucket.

The ```voice``` folder holds the code that is used in the Voxeo Platform.

## Instructions to run the Application

- Install the Docker in your system, and keep it running.
- Move into the application folder ```cd application```
- Run ```./run.sh``` - to bring up the docker containers.
- Run ```docker compose up -d``` to run the docker containers based on the image.
- Run ```docker compose down``` to bring down the dockers.

## Details to Test the Application

- This application is also hosted on the Cloud VM at http://34.70.4.81:8000/client
- Phone Number - +14073862174
- Voxeo Code - 9996118219

## Demo Videos

- [Voice Application Demo](https://drive.google.com/file/d/15VqnxnuMPBwMO-9pt4vDNhtdNZaTm9Rp/view?usp=sharing)
- [Web Application Demo](https://drive.google.com/file/d/15YWON0Q5zduWIkhOKjBC5XQwjOn3s1Lt/view?usp=sharing)
- [Kumaaraso Pitch](https://drive.google.com/file/d/15Z7P5QmDt6rmi4vdGQCrq1OVH-76le9L/view?usp=sharing)
- [Poster](https://drive.google.com/file/d/15Yvxt_lYM6Y1g2pIoYt8GRjWVQz9JYoQ/view?usp=sharing)