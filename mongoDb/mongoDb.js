// mongoDb.js - nodejs mongoDb functions
// Author: ItsOiK
// Date: 15/08-2021

const { MongoClient } = require("mongodb");



require('dotenv').config();


const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL
// const MONGO_DB_TEST_URL = process.env.MONGO_DB_TEST



const client = new MongoClient(MONGO_DB_CONNECTION_URL);
async function queryOneDb(query) {
	console.log("------------queryOneDb--------------")
	console.log(query)
	console.log("------------------------------------")
	let response = "",
		result = "";
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		response = await collection.findOne(query);
	} finally {
		await client.close();
		return response;
	}
}
async function queryManyDb(query) {
	console.log("------------queryManyDb--------------")
	console.log(query)
	console.log("-------------------------------------")
	let response = "",
		result = "";
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		response = await collection.findMany(query);
	} finally {
		await client.close();
		return response;
	}
}
async function queryGetAllDb() {
	console.log("------------queryGetAllDb--------------")
	let response = "",
		result = "";
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		response = await collection.find().toArray();
	} finally {
		await client.close();
		return response;
	}
}

async function addDb(data) {
	console.log("------------addDb--------------")
	console.log(data)
	console.log("-------------------------------")
	let response = "",
		result = "";
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		response = await collection.insertOne(data)
	} finally {
		await client.close();
		return response;
	}
}

async function deleteDb(data) {
	console.log("------------deleteDb--------------")
	console.log(data)
	console.log("----------------------------------")
	let response = "",
		result = "";
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		response = await collection.deleteOne(data)
	} finally {
		await client.close();
		return response;
	}
}

async function editDb(data) {
	console.log("------------editDb--------------")
	console.log(data)
	data[whatever] =
		console.log("--------------------------------")
	let response = "",
		result = "";
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		response = await collection.updateOne({ twitch_id: data.twitch_id }, data)
		console.log(response)
		result = await parseDiscordID(response)
		// response = await collection.updateMany
	} finally {
		await client.close();
		return result;
	}
}



async function parseDiscordID(memberArray) {
	const tempArray = []
	for (user of memberArray) {
		const tempUser = {}
		for (const [key, value] of Object.entries(user)) {
			if (key == "discord_id") {
				tempUser[key] = parseInt(value)
			} else {
				tempUser[key] = value
			}
		}
		tempArray.push(tempUser)
	}
	return tempArray
}



module.exports = { queryOneDb, queryManyDb, queryGetAllDb, addDb, deleteDb, editDb }






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
