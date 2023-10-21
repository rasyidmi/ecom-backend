const CryptoJS = require("crypto-js");

exports.encryptPassword = (password) => {
  const ciphertext = CryptoJS.AES.encrypt(
    password,
    process.env.PASSWORD_KEY
  ).toString();
  return ciphertext;
};

exports.decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedPassword,
    process.env.PASSWORD_KEY
  );
  const password = bytes.toString(CryptoJS.enc.Utf8);
  return password;
};

exports.decryptVerifyEmailToken = (value) => {
  const bytes = CryptoJS.AES.decrypt(value, process.env.PASSWORD_KEY);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue;
};
