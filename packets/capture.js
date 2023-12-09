pcap = require('pcap');
db = require("./Database");



//DECLARE GLOBAL VARS
class CaptureClass {
    constructor() {
        this.curSession = null;
        this.isCapturing = false;
        this.pcap_session = pcap.createSession('en0');
        this.setupCapture()
    }
    
    setupCapture () {
        //ON PACKET CAPTURE:
        this.pcap_session.on('packet', async (raw_packet) => {
            if (!this.isCapturing) return;
            var packet = pcap.decode.packet(raw_packet);
            console.log(`Captured Packet from ${packet.payload.payload.saddr} to ${packet.payload.payload.daddr} during session ${this.curSession}`);
            
            db.query(`INSERT INTO packets (s_addr, d_addr, info, session_id) VALUES (\
            '${(packet.payload.payload.saddr)}',\
            '${packet.payload.payload.daddr}',\
            '${packet.toString()}', ${this.curSession})`);
        });

    }

    //SESSION MANAGEMENT:
    endCapture () {
        if (this.isCapturing) {
            this.isCapturing = false; this.curSession = null; console.log("..<Session has Ended>..")
            return this.curSession
        } else {
            return -1
        }
    };

    get getCurSession() {
        return this.curSession
    }
    get getCurCapture() {
        return this.isCapturing
    }
    async capture (name, device, filter, scnds) {
        if (this.isCapturing) return;
        pcap.device = device;
        pcap.filter = filter;
        console.log(`New Session: { ${name} }`)
        db.query(`INSERT INTO sessions (name, device, filter, time, dur) VALUES ('${name}', '${device}', '${filter}', NOW(), ${scnds})`, (err, data) => {
            if (err) throw err;
            this.curSession = data.insertId;
            this.isCapturing = true;
            setTimeout(this.endCapture, scnds * 1000);
        })
    }
}

module.exports = { CaptureClass }; //EXPORT CAPTURE METHODS