import { getData } from "./apiService";
const test = async () => {
  console.log(await getData("users"));
  console.log(await getUser("60d0fe4f5311236168a109da"))
};

test();
