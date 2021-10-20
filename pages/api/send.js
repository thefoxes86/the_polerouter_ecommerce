import sgMail from '@sendgrid/mail';
const fs = require('file-system');

export default async function (req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email, name, message, file } = req.body;
  // var bitmap = fs.readFileSync(file);
  const imageBuffer64 = new Buffer(file).toString('base64');

  const content = {
    to: 'nicola.volpi86@gmail.com',
    from: 'enquiries@thepolerouter.com',
    subject: `New Message From - ${name}`,
    text: message,
    html: `<p><strong>${name} - ${email}</strong></p><p>${message}</p><img src="cid:myimagecid" />`,
    attachments: [
      {
        filename: 'image.jpeg',
        content: imageBuffer64,
        content_id: 'myimagecid',
      },
    ],
  };

  try {
    await sgMail.send(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('Message not sent. Retry');
  }
}
