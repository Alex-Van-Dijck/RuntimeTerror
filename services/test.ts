import { getData } from "./apiService";
const test = async () => {
  console.log(await getData("posts", true));
};

test();
