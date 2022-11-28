import { getData } from "./apiService";
const test = async () => {
  console.log(await getData("comments", true));
};

test();
