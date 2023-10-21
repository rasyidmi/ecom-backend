const Mailjet = require("node-mailjet");

const mailjet = new Mailjet({
  apiKey: process.env.MJ_API_KEY,
  apiSecret: process.env.MJ_SECRET_KEY,
});

const sendVerifyAccountEmail = (receiverName, receiverEmail, token) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "rasyidmihsan@gmail.com",
          Name: "Rasyid Ecom App",
        },
        To: [
          {
            Email: "receiverEmail",
            Name: "receiverName",
          },
        ],
        Subject: "Verify your Rasyid Ecom Account",
        TextPart:
          "",
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

module.exports = sendVerifyAccountEmail;
