const fs = require('fs').promises;

const deleteFile = async (filePath) => {
  try {
    // Check if the file is readable (R_OK)
    await fs.access(filePath, fs.constants.R_OK);
    
    // If the file is readable, unlink it
    await fs.unlink(filePath);
    
    console.log('File deleted successfully');
  } catch (err) {
    // Handle errors
    if (err.code === 'ENOENT') {
      console.log('File does not exist.');
    } else {
      console.error('Error deleting file:', err);
    }
  }
}

module.exports = deleteFile;
