# Packet_Sniffer

This is a node.js Server that captures packets flowing through the network on command and stores them in a database for later access.


## Setup:

1. To install the required dependencies, run:

```
 npm install 
```

2. Afterward, run the SQL script `./initDB.sql` in MySQL.
3. Then access `./.env` to input environment values as follows:

```
port = <port to run the server on>
host = <MySQL host name>
user = <MySQL username
pass = <MySQL password>
db = pcap
```

## Execution:

#### To run ther server, execute the following command:

```
 npm start
```


\
   **REST-API:**

 - GET #/api/capture/sessions
 > Get all the Sessions Stored In the Database.
 
 - GET #/api/capture/{sessionID}
 > Get all the Packets Stored In the Database corressponding to { sessionID }
 
 - DELETE #/api/capture/{sessionID}
 > Delete Session {sessionID} & All Corresponding Packets Stored In the Database
 
 - POST #/api/capture/new
 > Post Request to Initiate a New Packet-Capture Session on the Server based on the provided requestBody: {name, device, filter, duration}
 
 - DELETE #/api/capture/endCapture
 > Terminate the Running Packet-Capture Session ( If Any )
 
 
 *_More Detailed Description of the API's available under the 'openapi.json' file._*
