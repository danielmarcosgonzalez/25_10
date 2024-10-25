import { MongoClient } from 'mongodb'
import { UserModel, type BookModel } from "./types.ts";
import { getUsersByName } from "./resolvers.ts";

const url = Deno.env.get("MONGO_URL");
if(!url){
  console.log("not url MongoDB");
  Deno.exit(-1);
}
const client = new MongoClient(url);
const dbName = 'dia_25';
await client.connect();

const db = client.db(dbName);

const UserColecction = db.collection<UserModel>("users");
const BookCollection = db.collection<BookModel>("books");

const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if (method === "GET") {
    if (path === "/users") {
      const name = url.searchParams.get("name");
      if (name) return await getUsersByName(name,UserColecction,BookCollection);
    }
  return new Response("endpoint not found", { status: 404 });
  }
  return new Response("endpoint not found", { status: 404 });
};

Deno.serve({ port: 3000 }, handler);