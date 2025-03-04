import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary
export const uploadToCloudinary = async (file: File) => {
  return new Promise((resolve, reject) => {
    const arrayBuffer = file.arrayBuffer().then((buffer) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'auto' }, // Automatically detect file type
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(Buffer.from(buffer)); // Convert ArrayBuffer to Buffer
    }).catch((error) => {
      reject(error);
    });
  });
};