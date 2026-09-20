// This file is intended for keeping the connection to our services.
// we create them so that in case we change the service we are using then we can simply make the changes here.
// lets say we switch from Imgaekit to cloudinary

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {

    /* "toFile()" method takes the Multer Buffer
    Wraps it as a proper File
    Assigns the filename
    Adds the required size, name, and file methods
    Allows ImageKit to send it as multipart/form-data
    Without toFile(), ImageKit may treat the Buffer like a normal JavaScript object and attempt inefficient serialization, causing the heap out-of-memory error.*/
  const uploadableFile = await toFile(file, fileName);

  const result = await imagekit.files.upload({
    file: uploadableFile,
    fileName: fileName,
  });

  //we only need the url to refer to the content
  return result.url;
}

module.exports = { uploadFile };
