// twitch_api.js - nodejs twitch_api functions
// Author: ItsOiK
// Date: 15/08-2021


module.exports = {
	twitch_api: function (params) {
		return call_twitch(params)
	},
	validate_token: function (params){
		return validate_tokens(params)
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
]


function call_twitch(params){
	userName = params.query["userName"]
	userToken = params.query["userToken"]
	console.log(params.query)
	return {"it_works": true}
}



function validate_tokens(params){
	const userToken = params.query["userToken"]
	const userName = params.query["userName"]
	endpoint="https://id.twitch.tv/oauth2/validate"
	response = (async () => {
		await fetch(endpoint,{
			"headers": {
				"Authorization": "Bearer " + userToken
			}
		})
	})
	console.log("------------------------")
	console.log("response")
	console.log(response)
	console.log("------------------------")
	console.log("response.json()")
	console.log(response.json())
	console.log("------------------------")
	console.log(`user is mod: ${confirmUser(response.login)}, token expires: ${response.expires_in}`)
};



function confirmUser(userName){
	//TODO setup ngrok to localhost "database"
	if (MODERATORS.includes(userName)) return true
}