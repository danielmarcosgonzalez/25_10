import {MongoClient } from 'mongodb'

const url = Deno.env.get("MONGO_URL");
if(!url){
  console.log("not url MongoDB");
  Deno.exit(-1);
}
const client = new MongoClient(url);
