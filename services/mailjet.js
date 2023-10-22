const Mailjet = require("node-mailjet");

const mailjet = new Mailjet({
  apiKey: process.env.MJ_API_KEY,
  apiSecret: process.env.MJ_SECRET_KEY,
});

const sendVerifyAccountEmail = (
  receiverName,
  receiverEmail,
  token,
  tokenId
) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "rasyidmihsan@gmail.com",
          Name: "Rasyid Ecom App",
        },
        To: [
          {
            Email: `${receiverEmail}`,
            Name: `${receiverName}`,
          },
        ],
        TemplateID: 5205367,
        TemplateLanguage: true,
        Variables: {
          confirmation_link: `http://localhost:3000/confirm/${tokenId}/${token}`,
          receiver_name: receiverName,
        },
      },
    ],
  });

  request
    .then((result) => {
      console.log("Sending verification email.");
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Sending email failed.");
    });
};

module.exports = sendVerifyAccountEmail;
