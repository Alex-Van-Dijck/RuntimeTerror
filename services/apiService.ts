import axios from "axios";

export interface IPost {
  id?: string;
  image: string;
  likes: number;
  tags: string[];
  text: string;
  publishDate: string;
  owner: IUser;
}

export interface IUser {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface IComment {
  id: string;
  message: string;
  owner: IUser;
  post: string;
  publishDate: string;
}

interface IHeaderlist {
  "app-id": string;
}

interface IPostData {
  text: string;
  image: string;
  likes: number;
  tags: string[];
  owner: string;
}

let headersList: IHeaderlist = {
  "app-id": "636901de1c1d102ea94a8e0a",
};

let uri: string = "https://dummyapi.io/data/v1/";

// function to retrieve data from api. If not given any arguments then it will retrieve posts
// otherwise it will check if the given argument does match woith one of the 3 request possibilities
export const getData = async (stringRequest?: string, created?: boolean) => {
  stringRequest === undefined ? (stringRequest = "posts") : null;
  created === undefined ? (created = false) : null;
  let request: any;
  switch (stringRequest) {
    case "users":
      request = { url: `${uri}user`, method: "GET", headers: headersList };
      break;
    case "comments":
      request = { url: `${uri}comment`, method: "GET", headers: headersList };
      break;
    default:
      created
        ? (request = {
            url: `${uri}post?created=1`,
            method: "GET",
            headers: headersList,
          })
        : (request = {
            url: `${uri}post`,
            method: "GET",
            headers: headersList,
          });
      break;
  }
  const response = await axios.request(request);
  return response.data.data;
};

export const postData = async (data: IPostData, stringRequest?: string) => {
  stringRequest === undefined ? (stringRequest = "posts") : null;
  let request: any;
  switch (stringRequest) {
    case "users":
      request = { url: `${uri}user`, method: "GET", headers: headersList };
      break;
    case "comments":
      request = { url: `${uri}comment`, method: "GET", headers: headersList };
      break;
    default:
      request = {
        url: `${uri}post/create`,
        method: "POST",
        headers: headersList,
        data: data,
      };
      break;
  }
  const response = await axios.request(request);
  return response.data.data;
};

const main = async () => {
  let userData: IUser = await getData("users");
  console.log(userData);
};

//main();
