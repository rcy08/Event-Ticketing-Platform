const axios = require('axios');
const sharp = require('sharp');
const bucket = require('./initializeFirebase');

const downloadAndUploadImage = async (imageUrl, localImagePath, storagePath) => {
  try {
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    const pngBuffer = await sharp(imageResponse.data).toFormat('png').toBuffer();

    await sharp(pngBuffer).toFile(localImagePath);

    const response = await bucket.upload(localImagePath, {
      destination: storagePath,
      metadata: {
        contentType: 'image/png'
      }
    });

    const file = response[0];

    const downloadURL = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2050'
    });

    console.log('Image uploaded successfully!');
    console.log('Download URL:', downloadURL[0]);

    return downloadURL[0];
  } catch (error) {
    console.error('Error downloading/uploading image:', error.message);
    console.error('Error code:', error.code);
  }
};

module.exports = downloadAndUploadImage;
