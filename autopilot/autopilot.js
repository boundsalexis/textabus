const config = require("../config");
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function listAssistant(){
     return(client.autopilot.assistants
      .list({limit: 20})
      .then(assistants => assistants.forEach(a => console.log(a)))
) 
}
const eggs = "Iam eggs";
exports.eggs =eggs;
exports.listAssistant = listAssistant;