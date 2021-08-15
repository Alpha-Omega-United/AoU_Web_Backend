// mongoDb.js - nodejs mongoDb functions
// Author: ItsOiK
// Date: 15/08-2021

const { MongoClient } = require("mongodb");



require('dotenv').config();


//! const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL
const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_TEST



const client = new MongoClient(MONGO_DB_CONNECTION_URL);
async function queryDb(query) {
	let result
	try {
		await client.connect();
		const database = client.db('Database');
		const collection = database.collection('linked_accounts');
		// Query for a movie that has the title 'Back to the Future'
		result = await collection.findOne(query);
		console.log(result);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
		return result;
	}
}

module.exports = { queryDb }