// app.js - nodejs express API AoU Web Backend
// Author: ItsOiK
// Date: 15/08-2021


const twitch_api = require("./twitch_api/twitch_api")
const express = require("express");
const app = express();
const cors = require("cors");
const httpServer = require("http").Server(app);
const httpPort = 9999;

app.use(cors({ origin: '*' }));
app.use(express.json());

//! ------------------------------------ BACKEND ------------------------------------ //
//* ------- INDEX --------//
app.get("/", (req, res) => {
    res.status(200).json({ status: "Success!!!!" });
    // res.sendFile(__dirname + "/breakout/index.html");
});

app.get("/twitch_auth", async (req, res) => {
    console.log("/twitch_auth")
    let result = await twitch_api.validate_tokens(req)
    console.log("result - app.js")
    console.log(result)
    if (result.validation_status.success) {
        res.status(200).json({ status: 200, "data": [JSON.stringify(result)] });
    } else {
        if (result.validation_status.reason.includes("missing")) {
            res.status(401).json({ status: 401 });
        }
        if (result.validation_status.reason.includes("invalid")) {
            res.status(403).json({ status: 403 });
        }
    }
});

//* ------- MONGODB --------//
app.post("/database", async (req, res) => {
    if (req.method == "OPTIONS") {
        res.status(200)
        return
    } else {
        console.log("-------------req.body-----------")
        console.log(req.body)
        // console.log("-------------req.headers-----------")
        // console.log(req.headers)
        console.log("--------------------------------")
        if (req.body.userName == "" || req.body.userToken == null) {
            res.status(401).json({ status: 401, "data": null });
            return
        }
        let result = await twitch_api.queryDb(req.body)
        console.log("-------------app.js result-----------")
        console.log("result:")
        console.log(result.status)
        console.log("----------------------------------------------")
        try {
            if (result.status == "ok") {
                res.status(200).json({ status: 200, "data": [JSON.stringify(result)] });
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ status: 500, "data": null });
        }
    }
});



//! ------------------------------------ LISTEN ------------------------------------ //
httpServer.listen(process.env.PORT || httpPort, () => {
    time = Date.now();
    console.log(`${time} - HTTP - server running at ${httpPort}/`);
});
