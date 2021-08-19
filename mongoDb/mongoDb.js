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
		if (query.query == "ADD") {
			console.log("------------addDb--------------")
			response = await collection.insertOne(query.userData)
		}
		if (query.query == "EDIT") {
			console.log("------------editDb--------------")
			response = await collection.updateOne({ "_id": new ObjectId(query.userData._id) }, { $set: query.userData })
		}
		if (query.query == "DELETE") {
			console.log("------------deleteDb--------------")
			response = await collection.deleteOne({ "_id": new ObjectId(query.userData._id) })
		}
		if (query.query == "QUERYONE") {
			console.log("------------queryOneDb--------------")
			if ("twitch_name" in query.userData) {
				response = await collection.findOne({ "twitch_name": query.userData.twitch_name });
			} else if ("_id" in query.userData) {
				response = await collection.findOne({ "_id": new ObjectId(query.userData._id) });
			}
		}
		if (query.query == "QUERYMANY") {
			console.log("------------queryManyDb--------------")
			response = await collection.findMany(query.userData);
		}
		if (query.query == "QUERYGETALL") {
			console.log("------------queryGetAllDb--------------")
			response = await collection.find().toArray();
		}
		console.log("query:")
		console.log(query)
		console.log("------------------------------------")
		result = await parseDiscordID(response)
	} catch (err) {
		console.log(err)
	} finally {
		await client.close();
		console.log("result:")
		console.log(result)
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
