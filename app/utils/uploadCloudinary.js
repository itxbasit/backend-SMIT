import cloudinary from "../config/cloudinary.js";

export const uploadFile = (buffer) => {
  return new Promise((res, rej) => {
    const stream = cloudinary.uploader.upload_stream(
        {
            folder: "SMIT/profile-image",
            resource_type: "image"
        },
        (error, result) =>{
            if(error){
                return rej(error)
            }
            res({
                url: result.secure_url,
                publicId: result.public_id,
                format: result.format,
                size: result.bytes
            })
        }
    );
    stream.end(buffer);
  });
};
