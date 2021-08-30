// twitch_api.js - nodejs twitch_api functions
// Author: ItsOiK
// Date: 15/08-2021

module.exports = { queryDb, validate_tokens }


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


async function validate_tokens(params, dbValidating = false) {
	let userToken = "",
		userName = "";
	try {
		if (dbValidating) {
			userToken = params.userToken;
			userName = params.userName
		} else {
			userToken = params.query["userToken"];
			userName = params.query["userName"]
		};
		if (userToken.length < 1) {
			return { "validation_status": { "success": false, "reason": "missing token" } }
		}
	} catch (err) {
		console.log(err)
		return { "validation_status": { "success": false, "reason": "missing token" } }
	}
	const endpoint = "https://id.twitch.tv/oauth2/validate"
	const response = await fetch(endpoint, {
		"headers": {
			"Authorization": "OAuth " + userToken
		}
	})
		.then((response) => response.json())
		.then((data) => {
			return data
		})
		.catch((err) => console.log(err))
	let confirmedUserResult = await confirmUserToken(response, userName)
	console.log("confirmedUserResult")
	console.log(confirmedUserResult)
	if (confirmedUserResult) {
		console.log("twitch_api: #55")
		console.log(response)
		let userResponse = await confirmUserIsMod(response.login)
		console.log("userResponse")
		console.log(response)
		if (userResponse.isAdmin) {
			console.log("------------------------ confirmUserIsMod ------------------------")
			console.log(`user is mod: ${userResponse.isAdmin}, token expires: ${response.expires_in}`)
			if (!dbValidating) {
				console.log("DB is NOT validating")
				console.log("------------------------------------------------------------------")
				const result = await MONGO_DB.queryAny({ query: "QUERYGETALL" })
				return { "validation_status": { "success": true, "data": result } }
			} else {
				return { "validation_status": { "success": true, "data": userResponse } }
			}
		} else {
			//todo user is not mod, return queryOne
			return { "validation_status": { "success": true, "data": userResponse, "reason": "user is not mod" } }
		}
	} else {
		return { "validation_status": { "success": false, "reason": "invalid token" } }
	}
};

async function confirmUserToken(data, user) {
	if (data.login.toLowerCase() === user.toLowerCase() && data.client_id == AOU_WEB_CLIENT_ID) {
		return true
	}
	return false
}

async function confirmUserIsMod(userName) {
	let query = {
		query: "QUERYONE", userData: {
			twitch_name: userName.toLowerCase()
		}
	};
	let result = await MONGO_DB.queryAny(query)
		.catch((err) => console.log(err))
	if (result && result[0].twitch_name == userName) {
		return result[0]
	}
}

async function queryDb(params) {
	if (params.userName == "public" || params.userToken == "public") {
		const queryRequest = { query: 'QUERYMANY', userData: { "stream": { "$ne": null } } }
		const response = await MONGO_DB.queryAny(queryRequest)
		console.log("-----------PUBLIC-----------")
		console.log(response)
		console.log("----------------------------")
		return { "status": "under dev" }
	} else {
		const result = await validate_tokens(params, true)
		console.log(result)
		if (result.validation_status.success) {
			let response = {}
			try {
				response = await MONGO_DB.queryAny(params.databaseQuery)
				response["status"] = "ok"
			} catch (err) {
				console.log(err)
				response["status"] = "error"
			} finally {
				console.log("-----------TWITCH_API.js-----------")
				console.log(response)
				console.log("-----------------------------------")
				return response
			}
		} else {
			return { "status": "validation error" }
		}
	}
}
