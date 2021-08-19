// mongoDb.js - nodejs mongoDb functions
// Author: ItsOiK
// Date: 15/08-2021

const { MongoClient } = require("mongodb");



require('dotenv').config();


const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL
// const MONGO_DB_TEST_URL = process.env.MONGO_DB_TEST



const client = new MongoClient(MONGO_DB_CONNECTION_URL);
// async function queryOneDb(query) {
// 	console.log("------------queryOneDb--------------")
// 	console.log("query:")
// 	console.log(query)
// 	console.log("------------------------------------")
// 	let response = "",
// 		result = "";
// 	try {
// 		await client.connect();
// 		const database = client.db('aou_member_list');
// 		const collection = database.collection('members');
// 		response = await collection.findOne(query);
// 		console.log(response)
// 		result = await parseDiscordID(response)
// 	} finally {
// 		await client.close();
// 		console.log("result:")
// 		console.log(result)
// 		console.log("------------------------------------")
// 		return result;
// 	}
// }
// async function queryManyDb(query) {
// 	console.log("------------queryManyDb--------------")
// 	console.log("query:")
// 	console.log(query)
// 	console.log("------------------------------------")
// 	let response = "",
// 		result = "";
// 	try {
// 		await client.connect();
// 		const database = client.db('aou_member_list');
// 		const collection = database.collection('members');
// 		response = await collection.findMany(query);
// 		console.log(response)
// 		result = await parseDiscordID(response)
// 	} finally {
// 		await client.close();
// 		console.log("result:")
// 		console.log(result)
// 		console.log("------------------------------------")
// 		return result;
// 	}
// }
// async function queryGetAllDb() {
// 	console.log("------------queryGetAllDb--------------")
// 	let response = "",
// 		result = "";
// 	try {
// 		await client.connect();
// 		const database = client.db('aou_member_list');
// 		const collection = database.collection('members');
// 		response = await collection.find().toArray();
// 		console.log(response)
// 		result = await parseDiscordID(response)
// 	} finally {
// 		await client.close();
// 		console.log("result:")
// 		console.log(result)
// 		console.log("------------------------------------")
// 		return result;
// 	}
// }

// async function addDb(query) {
// 	console.log("------------addDb--------------")
// 	console.log("query:")
// 	console.log(query)
// 	console.log("------------------------------------")
// 	let response = "",
// 		result = "";
// 	try {
// 		await client.connect();
// 		const database = client.db('aou_member_list');
// 		const collection = database.collection('members');
// 		response = await collection.insertOne(query)
// 		console.log(response)
// 		result = await parseDiscordID(response)
// 	} finally {
// 		await client.close();
// 		console.log("result:")
// 		console.log(result)
// 		console.log("------------------------------------")
// 		return result;
// 	}
// }

// async function deleteDb(query) {
// 	console.log("------------deleteDb--------------")
// 	console.log("query:")
// 	console.log(query)
// 	console.log("----------------------------------")
// 	let response = "",
// 		result = "";
// 	try {
// 		await client.connect();
// 		const database = client.db('aou_member_list');
// 		const collection = database.collection('members');
// 		response = await collection.deleteOne(query)
// 		console.log(response)
// 		result = await parseDiscordID(response)
// 	} finally {
// 		await client.close();
// 		console.log("result:")
// 		console.log(result)
// 		console.log("------------------------------------")
// 		return result;
// 	}
// }

// async function editDb(query) {
// 	console.log("------------editDb--------------")
// 	console.log("query:")
// 	console.log(query)
// 	console.log("--------------------------------")
// 	let response = "",
// 		result = "";
// 	try {
// 		await client.connect();
// 		const database = client.db('aou_member_list');
// 		const collection = database.collection('members');
// 		response = await collection.updateOne({ twitch_id: query.twitch_id }, query)
// 		console.log(response)
// 		result = await parseDiscordID(response)
// 	} finally {
// 		await client.close();
// 		console.log("result:")
// 		console.log(result)
// 		console.log("------------------------------------")
// 		return result;
// 	}
// }


//! TEST AREA
async function queryAny(query) {
	let response = "",
		result = "";
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		if (query.query == "ADD") {
			console.log("------------addDb--------------")
			response = await collection.findOne(query).userData;
		}
		if (query.query == "EDIT") {
			console.log("------------editDb--------------")
			response = await collection.findMany(query).userData;
		}
		if (query.query == "DELETE") {
			console.log("------------deleteDb--------------")
			response = await collection.find().toArray();
		}
		if (query.query == "QUERYONE") {
			console.log("------------queryOneDb--------------")
			response = await collection.insertOne(query.userData)
		}
		if (query.query == "QUERYMANY") {
			console.log("------------queryManyDb--------------")
			response = await collection.deleteOne(query.userData)
		}
		if (query.query == "QUERYGETALL") {
			console.log("------------queryGetAllDb--------------")
			response = await collection.updateOne({ twitch_id: query.userData.twitch_id }, query)
		}
		console.log("query: \n" + query)
		console.log("------------------------------------")
		result = await parseDiscordID(response)
	} finally {
		await client.close();
		console.log("result:")
		console.log(result)
		console.log("------------------------------------")
		return result;
	}

}


//! TEST AREA


async function parseDiscordID(memberArray) {
	const tempArray = []
	if (Array.isArray(memberArray)) {
		console.log("is array")
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
		console.log("is object")
		const tempUserObject2 = {}
		for (const [key, value] of Object.entries(user)) {
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







// module.exports = { queryOneDb, queryManyDb, queryGetAllDb, addDb, deleteDb, editDb, queryAny }
module.exports = { queryAny }






// b=[
//     {
//     _id: new ObjectId("611a98d754868b1e9fde220a"),
//     discord_name: 'itsOik#1508',
//     discord_id: new Long("123600164433690625"),
//     twitch_name: 'itsoik',
//     twitch_id: 93645775,
//     points: 0,
//     isAdmin: true
//     },
//     {
//     _id: new ObjectId("611c4e2f6ed80e33f46e9f90"),
//     twitch_name: 'vivax3794',
//     twitch_id: 180840730,
//     discord_name: 'vivax#4105',
//     discord_id: new Long("366331361583169537"),
//     points: 0,
//     isAdmin: true
//     }
//     ]


// a=[
// 	{
// 		"_id": "611a98d754868b1e9fde220a",
// 		"discord_name": "itsOik#1508",
// 		"discord_id": {
// 			"low": -683671551,
// 			"high": 28777905,
// 			"unsigned": false
// 		},
// 		"twitch_name": "itsoik",
// 		"twitch_id": 93645775,
// 		"points": 0,
// 		"isAdmin": true
// 	},
// 	{
// 		"_id": "611c4e2f6ed80e33f46e9f90",
// 		"twitch_name": "vivax3794",
// 		"twitch_id": 180840730,
// 		"discord_name": "vivax#4105",
// 		"discord_id": {
// 			"low": -1254096895,
// 			"high": 85293166,
// 			"unsigned": false
// 		},
// 		"points": 0,
// 		"isAdmin": true
// 	}
// ]
