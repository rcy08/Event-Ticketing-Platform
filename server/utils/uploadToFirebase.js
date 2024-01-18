const axios = require('axios');
const bucket = require('./initializeFirebase');

const uploadImageToStorage = async (imageUrl, destinationPath) => {
    try {
      // Fetch the image content from the URL
      const { data } = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  
      // Create a buffer from the image content
      const imageBuffer = Buffer.from(data, 'binary');
  
      // Define the destination file in Firebase Storage
      const file = bucket.file(destinationPath);
  
      // Create a write stream for the file
      const stream = file.createWriteStream({
        metadata: {
          contentType: 'image/png', // Adjust the content type based on your image format
        },
      });
  
      // Write the buffer to the stream
      stream.end(imageBuffer);
  
      // Wait for the upload to complete
      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });

      const downloadUrl = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2050', // Adjust the expiration date as needed
      });
  
      console.log('Image uploaded to Firebase Storage successfully.');

      return downloadUrl[0];
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
};

module.exports = uploadImageToStorage;