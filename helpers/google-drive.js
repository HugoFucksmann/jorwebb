const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

async function conectDrive() {
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
}

async function uploadFile(drive, name = "gg.png", file, extencion = "image/png") {
  const filee = path.join(__dirname, "../files/images.png");
  try {
    const response = await drive.files.create({
      requestBody: {
        name: name, //This can be name of your choice
        mimeType: extencion,
        parents: ["1XhqRrFY4eHZ4uoZqKqooYsEBJX42D6iQ"],
      },
      media: {
        mimeType: extencion,
        body: fs.createReadStream(filee),
      },
    });
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

    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
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
