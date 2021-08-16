// twitch_api.js - nodejs twitch_api functions
// Author: ItsOiK
// Date: 15/08-2021


module.exports = {
	twitch_api: function (params) {
		return call_twitch(params)
	},
	validate_token: function (params) {
		return validate_tokens(params)
	},
	queryDb: function (params) {
		queryDb(params)
	}
};


require('dotenv').config();
const { response } = require('express');
const fetch = require('node-fetch');

const AOU_WEB_CLIENT_ID = process.env.AOU_WEB_CLIENT_ID
const AOU_WEB_SECRET = process.env.AOU_WEB_SECRET
const AOU_WEB_REDIRECT = process.env.AOU_WEB_REDIRECT
const AOU_HEROKU_ENDPOINT = process.env.AOU_HEROKU_ENDPOINT
const AOU_EMAIL = process.env.AOU_EMAIL
const HEROKU_PW = process.env.HEROKU_PW

const MONGO_DB = require("../mongoDb/mongoDb")


const MODERATORS = [
	"itsoik",
	"theserbian_",
	"ziddi_",
	"calviz_gaming",
	"deliriouszendera",
	"notariustv",
	"vivax3794"
]


function call_twitch(params) {
	userName = params.query["userName"]
	userToken = params.query["userToken"]
	return { "it_works": true }
}

async function validate_tokens(params) {
	const userToken = params.query["userToken"]
	const userName = params.query["userName"]
	endpoint = "https://id.twitch.tv/oauth2/validate"
	let response = await fetch(endpoint, {
		"headers": {
			"Authorization": "OAuth " + userToken
		}
	})
		.then((response) => response.json())
		.then((data) => {
			return data
		})
		.catch((err) => console.log(err))
	let userResponse = await confirmUserIsMod(response.login)

	if (userResponse) {
		console.log(`user is mod: ${userResponse}, token expires: ${response.expires_in}`)
		console.log(params.query["database"])
	}



	return JSON.stringify({ "validation_status": { "success": userResponse } })
};



async function confirmUserIsMod(userName) {
	//TODO setup ngrok to localhost "database"

	let query = { isAdmin: true };
	let result = await MONGO_DB.queryManyDb(query)
		.catch((err) => console.log(err))
	console.log("result - twitch_api.js")
	console.log(result)

	return (MODERATORS.includes(userName) ? true : false)
}



async function queryDb(params) {
	let result
	if (params.query["database"] == "QUERYONE") {
		result = await MONGO_DB.queryOneDb()
	}
	if (params.query["database"] == "QUERYMANY") {
		result = await MONGO_DB.queryManyDb({})
	}
	if (params.query["database"] == "ADD") {
		let data = { "twitch_name": userName }
		result = await MONGO_DB.addDb(data)
	}
	if (params.query["database"] == "EDIT") {
		result = await MONGO_DB.editDb()
	}
	if (params.query["database"] == "DELETE") {
		result = await MONGO_DB.deleteDb()
	}
	console.log("-----------TWITCH_API.js-----------")
	console.log(result)
	console.log("-------------------------------------")
}





a = {
	"client_id": "wbmytr93xzw8zbg0p1izqyzzc5mbiz",
	"login": "twitchdev",
	"scopes": [
		"channel:read:subscriptions"
	],
	"user_id": "141981764",
	"expires_in": 5520838
}