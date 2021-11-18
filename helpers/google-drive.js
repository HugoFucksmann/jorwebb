const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const { Stream } = require("stream");

async function conectDrive() {
  try {
    const auth2Client = new google.auth.OAuth2(
      process.env.DRIVE_ID_CLIENT,
      process.env.DRIVE_SECRET_ID,
      process.env.DRIVE_REDIRECT_URL
    );

    auth2Client.setCredentials({
      refresh_token: process.env.DRIVE_REFRESH_TOKEN,
    });

    const drive = google.drive({
      version: "v3",
      auth: auth2Client,
    });

    return drive;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function uploadFile(drive, name, file, extencion) {
  let bufferStream = new Stream.PassThrough();
  bufferStream.end(file);

  try {
    const response = await drive.files.create({
      requestBody: {
        name: name,
        mimeType: `image/${extencion}`,
        parents: ["1XhqRrFY4eHZ4uoZqKqooYsEBJX42D6iQ"],
      },
      media: {
        mimeType: `image/${extencion}`,
        body: bufferStream,
      },
    });
    console.log("respu del drive al crear ", response);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function deleteFile(drive, fileId) {
  try {
    const response = await drive.files.delete({
      fileId: fileId,
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

async function generatePublicUrl(drive, fileId) {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });

    return result.data;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

module.exports = {
  conectDrive,
  uploadFile,
  generatePublicUrl,
  deleteFile,
};
