const bucket = require('./initializeFirebase');

const uploadImage = async ( localImagePath, storagePath ) => {
  try {
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

    console.log(downloadURL);

    console.log('Image uploaded successfully!');
    return downloadURL[0];
  } catch (error) {
    console.error('Error uploading image:', error);
    return 'Error Uploading Image';
  }
};

module.exports = uploadImage;
