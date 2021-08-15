// twitch_api.js - nodejs twitch_api functions
// Author: ItsOiK
// Date: 15/08-2021


require('dotenv').config();

const AOU_WEB_CLIENT_ID = process.env.AOU_WEB_CLIENT_ID
const AOU_WEB_SECRET = process.env.AOU_WEB_SECRET
const AOU_WEB_REDIRECT = process.env.AOU_WEB_REDIRECT
const AOU_HEROKU_ENDPOINT = process.env.AOU_HEROKU_ENDPOINT
const AOU_EMAIL = process.env.AOU_EMAIL
const HEROKU_PW = process.env.HEROKU_PW



module.exports = {
	twitch_api: function (params) {
		return call_twitch(params)
	},
	validate_token: function (params){
		return validate_token(params)
	}
};


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
	response = await fetch(endpoint,{
		"headers": {
			"Client-ID": AOU_WEB_CLIENT_ID,
			"Authorization": "Bearer " + userToken
		}
	})
	console.log(response)

}