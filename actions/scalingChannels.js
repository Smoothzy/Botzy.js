const channelName = "+ Create channel 🆕";
const { Permissions } = require("discord.js");
var createdChs = [];

module.exports = (client) => {
  client.on("voiceStateUpdate", (oldstate, newState) => {
    const { guild } = oldstate;
    const joined = !!newState.channelId;
    let everyone = guild.roles.cache.find((r) => r.name === "@everyone");
    let memberRole = guild.roles.cache.find((r) => r.name === "member");
    let mods = guild.roles.cache.find((r) => r.name === "KING'S BITCHES");

    const channelId = joined ? newState.channelId : oldstate.channelId;
    const channel = guild.channels.cache.get(channelId);

    console.log(newState.member.user.username);

    if (channel.name === channelName) {
      if (joined) {
        let allowCreate = true;
        createdChs.forEach((e) => {
          if (e.member === newState.member.user.id) {
            allowCreate = false;
          }
        });
        if (createdChs.length == 10) {
          allowCreate = false;
        }
        if (allowCreate) {
          const Fun = [
            " Fanclub",
            "'s Harem",
            " at Queenstown",
            " & Chill",
            " Gang",
            " Hideaway",
            " Corner",
            " Sleepover",
            "'s Haters",
          ];
          var createChName = `${newState.member.user.username}${
            Fun[Math.floor(Math.random() * Fun.length)]
          }`;
          var createdCh = guild.channels.create(createChName, {
            type: "GUILD_VOICE",
            parent: "934980418489434163",
          });
          let member = newState.member.user.id;
          createdCh.then((val) => {
            newState.member.voice.setChannel(val);
            createdChs.push({ ch: val, member: member });
            val.permissionOverwrites.set([
              {
                id: member,
                allow: [
                  Permissions.FLAGS.MANAGE_CHANNELS
                ],
              },
            ]);
          });
        } else {
          console.log(`${newState.member.user.username} already has a ch`);
        }
      }
    } else {
      createdChs.forEach((e, index, object) => {
        console.log(e.ch.members.size);
        if (e.ch.members.size == 0) {
          object.splice(index, 1);
          e.ch.delete();
        }
      });
    }
  });
};
