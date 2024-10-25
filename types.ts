import type { ObjectId } from "mongodb";

export type UserModel = {
    name:string,
    age:number,
    _id:ObjectId,
    booksRead:ObjectId[],
}

export type BookModel ={
    _id: ObjectId,
    title:string,
    pages:number,
}

export type Book ={
    id:string,
    title:string,
    pages:number,
}

export type User = {
    name:string,
    age: number,
    id: string,
    booksRead:Book[]
}