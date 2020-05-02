require('dotenv').config();

module.exports = {
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  SFMTA_ASSISTANT: process.env.SFMTA_ASSISTANT
}
