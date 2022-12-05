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

/* An interface that is being exported. */
export interface IUser {
  id?: string;
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
  "app-id": string | undefined;
}

interface ICreatePost {
  text: string;
  image: string;
  likes: number;
  tags: string[];
  owner: string;
}

interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

interface ICreateComment {
  owner: string;
  post: string;
  message: string;
}

let headersList: IHeaderlist = {
  "app-id": "636901de1c1d102ea94a8e0a"
};

let uri: string = "https://dummyapi.io/data/v1/";


/**
 * It takes two optional parameters, a string and a boolean, and returns a promise that resolves to an
 * array of objects.
 * @param {string} [stringRequest] - string = "users", "comments" en "posts"
 * @param {boolean} [created] - boolean
 * @returns An array of objects.
 */
export const getAPIData = async (stringRequest?: string, created?: boolean) => {
  stringRequest === undefined ? (stringRequest = "posts") : null;
  created === undefined ? (created = false) : null;
  let request: any;
  switch (stringRequest) {
    case "users":
      created
        ? (request = {
            url: `${uri}user?created=1`,
            method: "GET",
            headers: headersList,
          })
        : (request = {
            url: `${uri}user`,
            method: "GET",
            headers: headersList,
          });
      break;
    case "comments":
      created
        ? (request = {
            url: `${uri}comment?created=1`,
            method: "GET",
            headers: headersList,
          })
        : (request = {
            url: `${uri}comment`,
            method: "GET",
            headers: headersList,
          });
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

/**
 * It takes in a data object and a stringRequest, and returns a response.data.data object.
 * @param {ICreatePost | ICreateUser | ICreateComment} data - ICreatePost | ICreateUser |
 * ICreateComment
 * @param {string} [stringRequest] - string
 * @returns The data that is being returned is the data that is being sent to the server.
 */
export const postData = async (data: ICreatePost | ICreateUser | ICreateComment, stringRequest?: string) => {
  stringRequest === undefined ? (stringRequest = "posts") : null;
  let request: any;
  switch (stringRequest) {
    case "users":
      request = { 
        url: `${uri}user/create`, 
        method: "POST", 
        headers: headersList,
        data: data
      };
      break;
    case "comments":
      request = { 
        url: `${uri}comment`, 
        method: "GET", 
        headers: headersList,
        data: data };
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

/**
 * This function takes a string as an argument and returns a promise that resolves to an object.
 * @param {string} id - string
 * @returns The response.data.data is the data that is being returned.
 */
export const getUser = async (id: string) => {
  let request :any = {
    url: `${uri}user/${id}`,
    method: "GET",
    headers: headersList,
  }
  const response = await axios.request(request);
  return response.data;
}

const main = async () => {
  // let userData: IUser = await getData("users");
  // console.log(userData);
  let user : IUser = await getUser("60d0fe4f5311236168a109dd");
  console.log(await user)
};

// main();
