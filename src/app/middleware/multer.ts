import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../lib/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cv_uploads",
    format: async (req, file) => "pdf", // Sirf PDF upload hogi
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({ storage });

export default upload;
