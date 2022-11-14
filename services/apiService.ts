import axios from "axios";

export interface IPost {
    id: string,
  image: string,
  likes: number,
  tags: string[],
  text: string,
  publishDate: string,
  owner: IUser
}

export interface IUser {
    id: string,
    title: string,
    firstName: string,
    lastName: string,
    picture: string
}

export interface IComment {
  id: string;
  message: string;
  owner: IUser;
  post: string;
  publishDate: string;
}

interface Request {
    url: string,
    method: string,
    headers: Headerlist
}

interface Headerlist {
    "app-id": string
}

let headersList: Headerlist = {
 "app-id": "636901de1c1d102ea94a8e0a" 
}

const users: Request = {
  url: "https://dummyapi.io/data/v1/user",
  method: "GET",
  headers: headersList,
}

const comments: Request = {
    url: "https://dummyapi.io/data/v1/comment",
    method: "GET",
    headers: headersList
}

const posts: Request = {
    url: "https://dummyapi.io/data/v1/post",
    method: "GET",
    headers: headersList
}

const getData = async (request:any) => {
    let response = await axios.request(request);
    // console.log(response.data);
    return response.data.data;
}

const main = async () => {
let userData: IUser = await getData(users);
// let commentData: IComment[] = await getData(comments);
// let postData : IPost[] = await getData(posts);
// console.table(userData);
// for (let i:number = 0; i < commentData.data.length; i++){
// }
console.log(userData);
}

main();