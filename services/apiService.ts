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

// function to retrieve data from api. If not given any arguments then it will retrieve posts
// otherwise it will check if the given argument does match woith one of the 3 request possibilities 
export const getData = async (stringRequest? : string) => {
    stringRequest === undefined ? stringRequest = "posts" : null;
    console.log(stringRequest);
    let request: any;
    switch (stringRequest){
        case "users":
            request = users;
            break;
        case "comments":
            request = comments;
            break
        default:
            request = posts;
            break;
    }
    let response = await axios.request(request);
    return response.data.data;
}

const main = async () => {
let userData: IUser = await getData("users");
console.log(userData);
}

//main();