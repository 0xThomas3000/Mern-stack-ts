// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
import { Twilio } from "twilio";

const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;

const client = new Twilio(accountSid, authToken);

export const sendSms = (to: string, body: string, txt: string) => {
  try {
    client.messages
      .create({
        body: `BlogDev ${txt} - ${body}`,
        from,
        to,
      })
      .then((message) => console.log(message.sid));
  } catch (err) {
    console.log(err);
  }
};
