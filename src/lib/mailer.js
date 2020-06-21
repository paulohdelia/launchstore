const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a277b641041a1d",
      pass: "97c13e36ed1fcb"
    }
  });