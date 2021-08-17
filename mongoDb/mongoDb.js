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
	let result
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		result = await collection.findOne(query);
	} finally {
		await client.close();
		return result;
	}
}
async function queryManyDb(query) {
	console.log("------------queryManyDb--------------")
	console.log(query)
	console.log("-------------------------------------")
	let result
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		result = await collection.findMany(query);
	} finally {
		await client.close();
		return result;
	}
}
async function queryGetAllDb() {
	console.log("------------queryGetAllDb--------------")
	let result
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		result = await collection.find().toArray();
	} finally {
		await client.close();
		return result;
	}
}

async function addDb(data) {
	console.log("------------addDb--------------")
	console.log(data)
	console.log("-------------------------------")
	let result
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		result = await collection.insertOne(data)
	} finally {
		await client.close();
		return result;
	}
}

async function deleteDb(data) {
	console.log("------------deleteDb--------------")
	console.log(data)
	console.log("----------------------------------")
	let result
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		result = await collection.deleteOne(data)
	} finally {
		await client.close();
		return result;
	}
}

async function editDb(data) {
	console.log("------------editDb--------------")
	console.log(data)
	data[whatever] = 
	console.log("--------------------------------")
	let result
	try {
		await client.connect();
		const database = client.db('aou_member_list');
		const collection = database.collection('members');
		result = await collection.updateOne({ twitch_id: data.twitch_id }, data)
		result = await collection.updateMany
	} finally {
		await client.close();
		return result;
	}
}


module.exports = { queryOneDb, queryManyDb, queryGetAllDb, addDb, deleteDb, editDb }