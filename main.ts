import {MongoClient } from 'mongodb'

const url = Deno.env.get("MONGO_URL");
if(!url){
  console.log("not url MongoDB");
  Deno.exit(-1);
}
console.log(url);
const client = new MongoClient(url);
