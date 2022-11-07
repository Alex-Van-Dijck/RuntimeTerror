import axios from "axios";

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

const getUsers: Request = {
  url: "https://dummyapi.io/data/v1/user",
  method: "GET",
  headers: headersList,
}

const getComments: Request = {
    url: "https://dummyapi.io/data/v1/comment",
    method: "GET",
    headers: headersList
}

const getPosts: Request = {
    url: "https://dummyapi.io/data/v1/post",
    method: "GET",
    headers: headersList
}

const getData = async (request:any) => {
    let response = await axios.request(request);
    // console.log(response.data);
    return response.data;
}

const main = async () => {
let userData = await getData(getUsers);
let commentData = await getData(getComments);
let postData = await getData(getPosts);
console.info(userData);
console.log(commentData.data[2].owner);
console.log(postData.data[2].owner);
}

main();