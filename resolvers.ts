import type { Collection, ObjectId } from "mongodb";
import type { Book, BookModel, User } from "./types.ts";
import type { UserModel } from "./types.ts";

export const getBooksFromIds = async (
    ids: ObjectId[],
    bookCollection:Collection<BookModel>
):Promise<Book[]> =>{
    const books:BookModel[] = await bookCollection.find({_id:{$in:ids}}).toArray();
    return books.map(b =>({
        id: b._id.toString(),
        title:b.title,
        pages:b.pages
    }))
}

export const getUsersByName = async (
    name:string,
    UserColecction:Collection<UserModel>,
    BookCollection: Collection<BookModel>,
):Promise<Response>=>{
    const users: UserModel[] = await UserColecction.find({name:name}).toArray();
    const finalUser: User[] = await Promise.all(users.map(async (u)=>({
        name: u.name,
        age: u.age,
        id: u._id.toString(),
        booksRead: await getBooksFromIds(u.booksRead, BookCollection)
    })));
    return new Response(JSON.stringify(finalUser));
}