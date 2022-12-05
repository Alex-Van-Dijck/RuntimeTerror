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

/**
 * It takes an apiKey, an imagePath and a name as arguments and returns an object with the image url
 * and the image delete url.
 * @param {string | undefined} apiKey - string | undefined,
 * @param {string} [imagePath] - The path to the image you want to upload.
 * @param {string} [name] - The name of the image.
 * @returns The result is being returned.
 */
export const getImageUrl = (
  imagePath?: string,
  name?: string
) => {
  const options: IOptions = {
    apiKey: process.env.IMGBB_API_KEY,
    imagePath:
      "",
    name: "",
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
