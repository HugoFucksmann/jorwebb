const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

async function conect() {
	const auth2Client = new google.auth.OAuth2(
		process.env.DRIVE_ID_CLIENT,
		process.env.DRIVE_SECRET_ID,
		process.env.DRIVE_REDIRECT_URL
	);

	auth2Client.setCredentials({
		refresh_token: process.env.DRIVE_REFRESH_TOKEN,
	});

	const drive = google.drive({
		version: 'v3',
		auth: auth2Client,
	});

	return drive;
}

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/

async function uploadFile(name, file, extencion) {
	const drive = await conect();
	//const filePath = path.join(__dirname, '../files/images.png');
	try {
		const response = await drive.files.create({
			requestBody: {
				name: name, //This can be name of your choice
				mimeType: tipo,
				parents: ['1XhqRrFY4eHZ4uoZqKqooYsEBJX42D6iQ'],
			},
			media: {
				mimeType: tipo,
				body: fs.createReadStream(file),
			},
		});

		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

// uploadFile();

async function deleteFile() {
	try {
		const response = await drive.files.delete({
			fileId: 'YOUR FILE ID',
		});
		console.log(response.data, response.status);
	} catch (error) {
		console.log(error.message);
	}
}

// deleteFile();

async function generatePublicUrl() {
	try {
		const fileId = 'YOUR FILE ID';
		await drive.permissions.create({
			fileId: fileId,
			requestBody: {
				role: 'reader',
				type: 'anyone',
			},
		});

		/* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
		const result = await drive.files.get({
			fileId: fileId,
			fields: 'webViewLink, webContentLink',
		});
		console.log(result.data);
	} catch (error) {
		console.log(error.message);
	}
}

// generatePublicUrl();

module.exports = {
	uploadFile,
};
