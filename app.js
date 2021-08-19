// app.js - nodejs express API AoU Web Backend
// Author: ItsOiK
// Date: 15/08-2021

AOU_HEROKU_ENDPOINT = "https://aou-website-backend.herokuapp.com/"

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
    result = await twitch_api.validate_token(req)
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
        console.log("--------------------------------")
        const result = await twitch_api.queryDb(req.body)
        console.log(JSON.stringify(result))
        let test = result[0].discord_id
        console.log(test)
        res.status(200).json({ status: 200, "data": [JSON.stringify(result)] });
    }
});



// b=[
//     {
//     _id: new ObjectId("611a98d754868b1e9fde220a"),
//     discord_name: 'itsOik#1508',
//     discord_id: new Long("123600164433690625"),
//     twitch_name: 'itsoik',
//     twitch_id: 93645775,
//     points: 0,
//     isAdmin: true
//     },
//     {
//     _id: new ObjectId("611c4e2f6ed80e33f46e9f90"),
//     twitch_name: 'vivax3794',
//     twitch_id: 180840730,
//     discord_name: 'vivax#4105',
//     discord_id: new Long("366331361583169537"),
//     points: 0,
//     isAdmin: true
//     }
//     ]


// a=[
// 	{
// 		"_id": "611a98d754868b1e9fde220a",
// 		"discord_name": "itsOik#1508",
// 		"discord_id": {
// 			"low": -683671551,
// 			"high": 28777905,
// 			"unsigned": false
// 		},
// 		"twitch_name": "itsoik",
// 		"twitch_id": 93645775,
// 		"points": 0,
// 		"isAdmin": true
// 	},
// 	{
// 		"_id": "611c4e2f6ed80e33f46e9f90",
// 		"twitch_name": "vivax3794",
// 		"twitch_id": 180840730,
// 		"discord_name": "vivax#4105",
// 		"discord_id": {
// 			"low": -1254096895,
// 			"high": 85293166,
// 			"unsigned": false
// 		},
// 		"points": 0,
// 		"isAdmin": true
// 	}
// ]




//! ------------------------------------ LISTEN ------------------------------------ //
httpServer.listen(process.env.PORT || httpPort, () => {
    time = Date.now();
    console.log(`${time} - HTTP - server running at ${httpPort}/`);
});
