import  { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectclus(){

  console.log("connecting to client");
  await client.connect();
  console.log("client connected");

  db=await client.db("healthbuddy");
  console.log("db connected");
}

export {connectclus,db};