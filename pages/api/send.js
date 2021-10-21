import sgMail from '@sendgrid/mail';

export default async function (req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email, name, message, subject } = req.body;
  // var bitmap = fs.readFileSync(file);

  const content = {
    to: 'enquiries@thepolerouter.com',
    from: 'enquiries@thepolerouter.com',
    subject: `New Message: ${subject}`,
    text: message,
    html: `<html><body><p><strong>${name} - ${email} - ${subject}</strong></p><p>${message}</p></body></html>`,
  };

  try {
    await sgMail.send(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('Message not sent. Retry');
  }
}
