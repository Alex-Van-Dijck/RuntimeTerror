const imgbbUploader = require("imgbb-uploader");
require("dotenv").config();

interface IResponse {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: string;
  height: string;
  size: number;
  time: string;
  expiration: string;
  image: IImage;
  thumb: IImage;
  medium: IImage;
  delete_url: string;
}

interface IImage {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}

interface IOptions {
  apiKey: string | undefined;
  imagePath: string;
  name?: string | undefined;
}

const apiKey: string | undefined = process.env.IMGBB_API_KEY;
console.log(apiKey);

const getImageUrl = (
  apiKey: string | undefined,
  imagePath?: string,
  name?: string
) => {
  const options: IOptions = {
    apiKey: apiKey,
    imagePath:
      "C:\\Users\\raven\\Pictures\\Screenshots\\Schermafbeelding_20221104_111059.png",
    name: "Your favo picture",
  };

  imagePath ? (options.imagePath = imagePath) : null;
  name !== "" ? (options.name = name) : null;

  let result: IResponse = imgbbUploader(options)
    .then((response: IResponse) => {
      result = response;
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {
      return result;
    });
  return result;
};

let data: IResponse = getImageUrl(apiKey);
console.log(data.url);
