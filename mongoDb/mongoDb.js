// mongoDb.js - nodejs mongoDb functions
// Author: ItsOiK
// Date: 15/08-2021

const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL

const client = new MongoClient(MONGO_DB_CONNECTION_URL);
async function queryAny(query) {
	let response = "",
		result = "";
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		console.log(`------------${query.query}--------------`)
		console.log("query:")
		console.log(query)
		console.log("------------------------------------")
		if (query.query == "ADD") {
			response = await collection.insertOne(query.userData)
		}
		if (query.query == "EDIT") {
			const dataToSet = {}
			for (const [key, value] of Object.entries(query.userData)) {
				if (key != "_id") {
					if (value != null) {
						dataToSet[key] = value
					}
				}
			}
			console.log("----dataToSet----")
			console.log(dataToSet)
			console.log("-----------------")
			response = await collection.updateOne({ "_id": new ObjectId(query.userData._id) }, { $set: dataToSet })
		}
		if (query.query == "DELETE") {
			response = await collection.deleteOne({ "_id": new ObjectId(query.userData._id) })
		}
		if (query.query == "QUERYONE") {
			if ("twitch_name" in query.userData) {
				response = await collection.findOne({ "twitch_name": query.userData.twitch_name });
			} else if ("_id" in query.userData) {
				response = await collection.findOne({ "_id": new ObjectId(query.userData._id) });
			}
		}
		if (query.query == "QUERYMANY") {
			response = await collection.findMany(query.userData);
		}
		if (query.query == "QUERYGETALL") {
			response = await collection.find().toArray();
		}
		result = await parseDiscordID(response)
	} catch (err) {
		console.log(err)
	} finally {
		await client.close();
		console.log("result:")
		console.log((query.query == "QUERYGETALL" ? `QUERYGETALL length: ${result.length}` : result))
		console.log("------------------------------------")
	}
	return result;
}


async function parseDiscordID(memberArray) {
	const tempArray = []
	if (Array.isArray(memberArray)) {
		for (user of memberArray) {
			const tempUserObject1 = {}
			for (const [key, value] of Object.entries(user)) {
				if (key == "discord_id") {
					tempUserObject1[key] = parseInt(value)
				} else {
					tempUserObject1[key] = value
				}
			}
			tempArray.push(tempUserObject1)
		}
	} else if (typeof memberArray === "object") {
		const tempUserObject2 = {}
		for (const [key, value] of Object.entries(memberArray)) {
			if (key == "discord_id") {
				tempUserObject2[key] = parseInt(value)
			} else {
				tempUserObject2[key] = value
			}
		}
		tempArray.push(tempUserObject2)
	}
	return tempArray
}

module.exports = { queryAny }
