const config = require("./config");
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const sfmtaAssistant = config.SFMTA_ASSISTANT;
const client = require('twilio')(accountSid, authToken);

//returns all assistant information
function listAssistant(){
     return(client.autopilot.assistants
      .list({limit: 20})
      .then(assistants => assistants.forEach(a => console.log(a)))
) 
}
function thisAssistant(){
      return(
            client.autopilot.assistants(sfmtaAssistant)
                .fetch()
                .then(assistant => console.log(assistant))
      )
}
//creates assistant
function createAssistant(){
      return(
            client.autopilot.assistants
                .create({
                   friendlyName: 'San Francisco Municipal Transportation Agency',
                   uniqueName: 'sfmta'
                 })
                .then(assistant => console.log(assistant.sid))
      )
}
//wont export now, only including as a precaution
function deleteAssistant(){
      return(
            client.autopilot.assistants(sfmtaAssistant).remove()
      )
}
function checkDefaults(){
      return(
            client.autopilot.assistants(sfmtaAssistant)
                .defaults()
                .fetch()
                .then(defaults => console.log(defaults))
      )
}
function updateDefaults(){
      return(
            client.autopilot.assistants(sfmtaAssistant)
                .defaults()
                .update({defaults: {
                   defaults: {
                     assistant_initiation: 'task://hello-world',
                     fallback: 'task://hello-world'
                   }
                 }})
                .then(defaults => console.log(defaults))
      )
}
function checkStyleSheet(){
    console.log("hello1")
      return(
            client.autopilot.assistants(sfmtaAssistant)
                .styleSheet()
                .fetch()
                .then(style_sheet => console.log(style_sheet))
      )
}
function updatStyleSheet(){
      return(
            client.autopilot.assistants(sfmtaAssistant)
                .styleSheet()
                .update({styleSheet: {
                   style_sheet: {
                     voice: {
                       say_voice: 'Polly.Joanna'
                     }
                   }
                 }})
                .then(style_sheet => console.log(style_sheet.assistantSid))
      )
}

// listAssistant();
exports.listAssistant = listAssistant;
exports.thisAssistant = thisAssistant;
exports.createAssistant = createAssistant;
exports.checkDefaults = checkDefaults;
exports.checkStyleSheet =checkStyleSheet;
