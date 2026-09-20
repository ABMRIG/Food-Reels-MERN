const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

//this function generates the temporary authentication details that the frontend needs to upload a file directly to ImageKit
function getUploadAuthenticationParameters() {
    const authenticationParameters =
        imagekit.helper.getAuthenticationParameters();

    return {
        ...authenticationParameters,
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    };
}

module.exports = {
    getUploadAuthenticationParameters,
};