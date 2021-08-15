// app.js - nodejs express API AoU Web Backend
// Author: ItsOiK
// Date: 15/08-2021


const fs = require("fs");
const app = require("express")();

const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer);

const httpPort = 3000;

//! ------------------------------------ BACKEND ------------------------------------ //
// //* ------- INDEX --------//
app.get("/", (req, res) => {
    res.status(200).json({ status: "Success!!!!" });
    // res.sendFile(__dirname + "/breakout/index.html");
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
