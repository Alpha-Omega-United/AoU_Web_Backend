// app.js - nodejs express API AoU Web Backend
// Author: ItsOiK
// Date: 15/08-2021

AOU_HEROKU_ENDPOINT = "https://aou-website-backend.herokuapp.com/"

const twitch_api = require("./twitch_api/twitch_api")

const app = require("express")();
const cors = require("cors");
const httpServer = require("http").Server(app);
const httpPort = 9999;

app.use(cors({ origin: '*' }));
app.use(express.json());

//! for specific origins
// const allowedOrigins = ['https://alpha-omega-united.github.io/', AOU_HEROKU_ENDPOINT]
// const corsOptions = {
// 	origin: function (origin, callback) {
// 		if (allowedOrigins.indexOf(origin) !== -1) {
// 			callback(null, true)
// 		} else {
// 			callback(new Error('Not allowed by CORS'))
// 		}
// 	}
// }

// app.use(cors(corsOptions));
//! for specific origins



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
    console.log("-------------req-----------")
    console.log(req)
    console.log("-------------req.query-----------")
    console.log(req.query)
    console.log("-------------req.body-----------")
    console.log(req.body)
    console.log("-------------req.params-----------")
    console.log(req.params)
    // result = await twitch_api.queryDb(req)
    // console.log(result)
    // res.status(200).json({ status: 200, "data": [result] });
    res.status(200).json({ status: 200, "data": ["result"] });
});










// //* ------- COMMANDS --------//
// app.post("/changeImg", (params, res) => {
//     let url = params.query["img_url"];
//     let userName = params.query["user_name"];
//     io.emit("changeImg", url);
//     io.emit("changeName", userName);
//     res.status(200).json({ status: "Success!!!!" });
// });
// //* ------- ASSETS --------//
// app.get("/breakout/oik_logo.png", (reg, res) => {
//     res.sendFile(__dirname + "/breakout/oik_logo.png");
//     console.log(__dirname + "/breakout/oik_logo.png");
// });

//! ------------------------------------ LISTEN ------------------------------------ //

httpServer.listen(process.env.PORT || httpPort, () => {
    time = Date.now();
    console.log(`${time} - HTTP - server running at ${httpPort}/`);
});
