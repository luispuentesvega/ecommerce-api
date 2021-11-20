require('dotenv').config();

export default {
  region: process.env.AWS_DEFAULT_REGION || "",
  accessKeyId: process.env.AWS_ACCESS_KEY || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};