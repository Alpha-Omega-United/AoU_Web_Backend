// twitch_api.js - nodejs twitch_api functions
// Author: ItsOiK
// Date: 15/08-2021


module.exports = {
	twitch_api: function (params) {
		return call_twitch(params)
	},
	validate_token: function (params){
		return await validate_token(params)
	}
};


require('dotenv').config();

const AOU_WEB_CLIENT_ID = process.env.AOU_WEB_CLIENT_ID
const AOU_WEB_SECRET = process.env.AOU_WEB_SECRET
const AOU_WEB_REDIRECT = process.env.AOU_WEB_REDIRECT
const AOU_HEROKU_ENDPOINT = process.env.AOU_HEROKU_ENDPOINT
const AOU_EMAIL = process.env.AOU_EMAIL
const HEROKU_PW = process.env.HEROKU_PW

const MODERATORS = [
	"itsoik",
	"theserbian_",
	"ziddi_",
	"calviz_gaming",
	"deliriouszendera",
	"notariustv"
],


function call_twitch(params){
	userName = params.query["userName"]
	userToken = params.query["userToken"]
	console.log(params.query)
	return {"it_works": true}
}



async function validate_token(params){
	const userToken = params.query["userToken"]
	const userName = params.query["userName"]
	endpoint="https://id.twitch.tv/oauth2/validate"
	response = (async () => fetch(endpoint,{
		"headers": {
			"Client-ID": AOU_WEB_CLIENT_ID,
			"Authorization": "Bearer " + userToken
		}
	}))
	console.log("------------------------")
	console.log("response")
	console.log(response)
	console.log("------------------------")
	console.log("response.json("))
	console.log(response.json())
	console.log("------------------------")
	example_response = {
		"client_id": "wbmytr93xzw8zbg0p1izqyzzc5mbiz",
		"login": "twitchdev",
		"scopes": [
			"channel:read:subscriptions"
		],
		"user_id": "141981764",
		"expires_in": 5520838
	}
	console.log(`user is mod: ${confirmUser(response.login)}, token expires: ${response.expires_in}`)
}



function confirmUser(userName){
	//TODO setup ngrok to localhost "database"
	if (MODERATORS.includes(userName)) return true
}