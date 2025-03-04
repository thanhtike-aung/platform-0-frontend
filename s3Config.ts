import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: "AKIAVVZOOONFTSHNVY4Y",
    secretAccessKey: "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",
  },
});

export const uploadToS3 = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;
  const params = {
    Bucket: "asone-thoke",
    Key: `uploads/${fileName}`,
    Body: file,
    ContentType: file.type,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return `https://asone-thoke.s3.amazonaws.com/uploads/${fileName}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
