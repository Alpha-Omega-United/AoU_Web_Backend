// twitch_api.js - nodejs twitch_api functions
// Author: ItsOiK
// Date: 15/08-2021


module.exports = {
	validate_token: async function (params) {
		return await validate_tokens(params)
	},
	apiQueryDb: async function (params) {
		const result = await queryDb(params)
		console.log(result)
		return result
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
	if (confirmedUserResult) {
		let userResponse = await confirmUserIsMod(response.login)
		if (userResponse) {
			console.log("------------------------ confirmUserIsMod ------------------------")
			console.log(`user is mod: ${userResponse}, token expires: ${response.expires_in}`)
			console.log("------------------------------------------------------------------")
			if (!dbValidating) {
				// const result = await MONGO_DB.queryGetAllDb()
				//! TEST AREA
				const result = await MONGO_DB.queryAny({ query: "QUERYGETALL" })
				//! TEST AREA
				return { "validation_status": { "success": userResponse }, "data": result }
			} else {
				return { "validation_status": { "success": userResponse } }
			}
		} else {
			return { "validation_status": { "success": userResponse, "reason": "invalid user" } }
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
	let query = { query: "QUERYONE", twitch_name: userName.toLowerCase() };
	// let result = await MONGO_DB.queryOneDb(query)
	// 	.catch((err) => console.log(err))
	//! TEST AREA
	let result = await MONGO_DB.queryAny(query)
		.catch((err) => console.log(err))
	//! TEST AREA
	return result.isAdmin
}



async function queryDb(params) {
	const result = await validate_tokens(params, true)
	if (result.validation_status.success) {
		//! TEST AREA
		let response = {}
		try {
			response = await MONGO_DB.queryAny(params.databaseQuery)
			response["status"] = "ok"
		} catch (err) {
			console.log(err)
			response = { status: "error" }
		} finally {
			console.log("-----------TWITCH_API.js-----------")
			console.log(response)
			console.log("-----------------------------------")
			return response
		}
		//! TEST AREA

		// if (params.databaseQuery.query == "ADD") {
		// 	response = await MONGO_DB.addDb(params.databaseQuery.userData) //* WORKS
		// } else if (params.databaseQuery.query == "EDIT") {
		// 	response = await MONGO_DB.editDb(params.databaseQuery.userData) // TODO REQUIRES TESTING
		// 	// } else if (params.databaseQuery.query == "DELETE") { //! DISABLED WHILE TESTING
		// 	// 	response = await MONGO_DB.deleteDb(params.databaseQuery.userData) //! DISABLED WHILE TESTING
		// } else if (params.databaseQuery.query == "QUERYONE") {
		// 	response = await MONGO_DB.queryOneDb(params.databaseQuery.userData) // TODO REQUIRES TESTING
		// } else if (params.databaseQuery.query == "QUERYMANY") {
		// 	response = await MONGO_DB.queryManyDb(params.databaseQuery.userData) // TODO REQUIRES TESTING
		// } else if (params.databaseQuery.query == "QUERYGETALL") {
		// 	response = await MONGO_DB.queryGetAllDb() // TODO REQUIRES TESTING
		// };
		// console.log("-----------TWITCH_API.js-----------")
		// console.log(response)
		// console.log("-----------------------------------")
		// return response
	}
}




// a = {
// 	"client_id": "wbmytr93xzw8zbg0p1izqyzzc5mbiz",
// 	"login": "twitchdev",
// 	"scopes": [
// 		"channel:read:subscriptions"
// 	],
// 	"user_id": "141981764",
// 	"expires_in": 5520838
// }







// b = {
// 	_id: new ObjectId("611a98d754868b1e9fde220a"),
// 	discord_name: 'itsOik#1508',
// 	discord_id: new Long("123600164433690625"),
// 	twitch_name: 'itsoik',
// 	twitch_id: 93645775,
// 	points: 0,
// 	isAdmin: true
// }
