import { getData } from './apiService';
const test = async () => {
    console.log(await getData("users"));
}

test();