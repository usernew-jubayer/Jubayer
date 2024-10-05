module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "Nayan",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "being kicked by the administrator na pasikat";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`𝚄𝙽𝙰𝙱𝙻𝙴 𝚃𝙾 𝚁𝙴-𝙰𝙳𝙳 𝙼𝙴𝙼𝙱𝙴𝚁𝚂 ${name} 𝚃𝙾 𝚃𝙷𝙴 𝙶𝚁𝙾𝚄𝙿\n\n${name} 𝙱𝙻𝙾𝙲𝙺𝙴𝙳 𝙼𝙴 𝙾𝚁 𝚃𝙷𝙴𝚁𝙴 𝙸𝚂 𝙽𝙾 𝙼𝙰𝚂𝚂𝙰𝙶𝙴 𝙾𝙿𝚃𝙸𝙾𝙽 𝙸𝙽 𝚃𝙷𝙴 𝙿𝚁𝙾𝙵𝙸𝙻𝙴  `, event.threadID)
   } else api.sendMessage(`${name} 𝘀𝘁𝘂𝗽𝗶𝗱 𝘆𝗼𝘂 𝗵𝗮𝘃𝗲 𝗻𝗼 𝗲𝘀𝗰𝗮𝗽𝗲 𝗳𝗿𝗼𝗺 𝗵𝗲𝗿𝗲`, event.threadID);
  })
 }
}
