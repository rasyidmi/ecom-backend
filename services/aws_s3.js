const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: "ap-southeast-2",
});

const deleteFile = async (fileUrl, folderName) => {
  const fileName = path.basename(fileUrl);
  const key = `${folderName}/${fileName}`;
  const command = new DeleteObjectCommand({
    Bucket: "ecomapp-bucket",
    Key: key,
  });

  const response = await s3.send(command);
  console.log(response);
};

exports.awsDeleteFile = deleteFile;
