
//Dependencies
var express = require("express")
var capture = require("./packets/capture");
var CaptureCon = new capture.CaptureClass();

var db = require("./packets/Database");

//SetUp Router
var router = express.Router();
router.use(express.json());

// var capture = new packetCapture();

//GET STORED SESSIONS { GET:: #/api/capture/sessions }
router.get("/sessions", (req, res) => {
    db.query(`SELECT * FROM sessions`, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

//GET PACKETS STORED IN A SESSION { GET:: #/api/capture/:Session_ID }
router.get("/packets/:id", (req, res) => {
    console.log(CaptureCon.getCurSession)
    console.log(CaptureCon.getCurCapture)
    var id = req.params.id;
    if (parseInt(id, 10).toString() != id) { res.status(400).send("Invalid Parameter Provided"); return }
    db.query(`SELECT * FROM sessions WHERE id = ${id}`, (err, data) => {
        if (data.length) {
            db.query(`SELECT * FROM packets WHERE session_id = ${id}`, (err, data) => {
                if (err) throw err;
                res.send(data);
            });
        } else res.status(404).send(`NO SUCH SESSION: { id = ${id} }`);
    });
});

//INITIATE NEW CAPTURE SESSION { POST:: #/api/capture/new } ~~ BODY: {name, device, filter, duration}
router.post("/new", (req, res) => {
    var { name, device, filter, duration } = req.body
    CaptureCon.capture(name, device, filter, duration);
    setTimeout(() => {res.send(`Capturing Packets To Session { ${name} - id: ${CaptureCon.getCurSession} } ~ ${duration} sec.`)}, 100)
});

//END THE CURRENT CAPTURE SESSION { DELETE:: #/api/capture/endCapture }
router.delete("/endCapture", (req, res) => {
    if (CaptureCon.endCapture()) {
        res.send("CAPTURE TERMINATED");
    } else {
        res.status(404).send("NO CAPTURE IN PROGRESS");
    }
})

//DELETE SESSION WITH PACKETS { DELETE:: #/api/capture/:Session_ID }
router.delete("/:sessionId", (req, res) => {
    var message = "";
    var endcap = CaptureCon.endCapture();
    var id = req.params.sessionId;
    if (endcap != -1 && endcap == id) message += "Capture Terminated and ";
    if (parseInt(id, 10).toString() != id) { res.status(400).send("Invalid Parameter Provided"); return }
    db.query(`SELECT * FROM sessions WHERE id = ${id}`, (err, result) => {
        if (err) throw err;
        if (result.length) {
            db.query(`DELETE FROM packets WHERE session_id = ${id}`);
            db.query(`DELETE FROM sessions WHERE id = ${id}`);
            message += "Deleted!";
            res.send(message);
        } else res.status(404).send(`NO SUCH SESSION: { id = ${id} }`);
    });
});

module.exports = router; //Export Router