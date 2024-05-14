import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.config";
import sharp from "sharp";

export const uploadFile = async (
  file: Express.Multer.File,
  name: string,
  type: string
) => {
  try {
    if (!file.buffer) {
      throw new Error("File buffer is missing");
    }
    const validMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/tiff",
      "image/gif",
      "image/svg+xml",
    ];
    if (!validMimeTypes.includes(file.mimetype)) {
      throw new Error("Unsupported file type");
    }

    const fileBuffer = await sharp(file.buffer)
      .resize(800, 800, {
        fit: "inside",
      })
      .toFormat("webp")
      .webp({ quality: 80 })
      .toBuffer();

    const fileRef = ref(storage, `file/${type}/${name}-${Date.now()}`);
    const fileMetadata = {
      contentType: file.mimetype,
    };

    const fileUploadPromise = uploadBytesResumable(
      fileRef,
      fileBuffer,
      fileMetadata
    );
    await fileUploadPromise;

    const fileDownloadURL = await getDownloadURL(fileRef);

    return { ref: fileRef, downloadUrl: fileDownloadURL };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
