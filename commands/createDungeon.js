const discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord.js");
const { isMethodSignature } = require("typescript");

let joinBtns = [];
let leaveBtns = [];
let counter = 0;

module.exports = {
  category: "Group",
  description: "Replies with pong",
  slash: true,

  minArgs: 2,
  expectedArgs: "<dungeon> <players>",
  expectedArgsTypes: ["STRING", "NUMBER"],

  callback: async ({ interaction, args, channel, message }) => {
    const row = new MessageActionRow();

    joinBtns.push(`Join`);
    leaveBtns.push(`Leave`);
    row
      .addComponents(
        new MessageButton()
          .setCustomId("Join")
          .setLabel("Join")
          .setStyle("PRIMARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("Leave")
          .setLabel("Leave")
          .setStyle("DANGER")
      );

    const filter = (i) => {
      //console.log(i.customId);
      //console.log(joinBtns[joinBtns.indexOf(i.customId)]);
      //if (i.customId.match(/Join*/)) {
      //  return i.customId === joinBtns[joinBtns.indexOf(i.customId)];
      //} else {
      //  return i.customId === leaveBtns[leaveBtns.indexOf(i.customId)];
      //}
      return i.customId === "Join" || i.customId === "Leave";
    };

    await interaction
      .reply({
        content: `Activity: ${args[0]}
Needed: ${parseInt(args[1])}
Attending members: ${interaction.user.username}`,
        components: [row],
        fetchReply: true,
      })
      .then((message) => {
        const collector = message.createMessageComponentCollector({
          filter,
          componentType: "BUTTON",
        });

        let singedUpCounter = 0;
        let signedUpUser = [];
        signedUpUser.push(interaction.user.id);
        collector.on("collect", async (i) => {
          console.log(parseInt(args[1]));
          console.log(i.customId);
          console.log(signedUpUser);
          console.log(singedUpCounter);
          console.log(interaction.user.id);

          if (i.customId == "Join") {
            if (
              singedUpCounter < parseInt(args[1]) - 1 &&
              signedUpUser.includes(i.user.id) == false
            ) {
              signedUpUser.push(i.user.id);
              singedUpCounter++;

              await i.deferUpdate();
              await interaction.editReply({
                content: `${i.message} ,${i.user.username}`,
              });
            } else {
              await i.reply({
                content: "Sorry, this party seems full or you already joined!",
                ephemeral: true,
              });
            }
          } else {
            if (
              (singedUpCounter > 0 &&
                signedUpUser.includes(i.user.id) == true) ||
              signedUpUser[0] != interaction.user.id
            ) {
              signedUpUser.pop(i.user.id);
              singedUpCounter--;
              console.log(singedUpCounter);
              console.log(signedUpUser);

              await i.deferUpdate();
              await interaction.editReply({
                content: `${i.message
                  .toString()
                  .replace(`,${i.user.username}`, "")} `,
              });
            } else {
              await i.reply({
                content: "You are not in ths party dummy!!!!!",
                ephemeral: true,
              });
            }
          }
        });
      });

    //const collector = channel.createMessageComponentCollector({
    //  componentType: "BUTTON",
    //  filter,
    //});

    //collector.on("collect", async (i) => {
    //  try {
    //    console.log(i.customId);
    //    //if (i.customId === joinBtns[joinBtns.indexOf(i.customId)]) {
    //    //  if (singedUpCounter < parseInt(args[1]) - 1) {
    //    //    await i.deferUpdate();
    //    //    await i.editReply({
    //    //      content: `${i.message} ,${i.user.username}`,
    //    //    });
    //    //    signedUpUser.push(i.user.id);
    //    //    singedUpCounter++;
    //    //  } else {
    //    //    await i.reply({
    //    //      content: "Sorry, this party seems full or you already joined!",
    //    //      ephemeral: true,
    //    //    });
    //    //  }
    //    //} else if (i.customId === leaveBtns[leaveBtns.indexOf(i.customId)]) {
    //    //  if (signedUpUser.includes(i.user.id) == true) {
    //    //    await i.deferUpdate();
    //    //    await i.editReply({
    //    //      content: `${i.message
    //    //        .toString()
    //    //        .replace(`,${i.user.username}`, "")} `,
    //    //    });
    //    //    signedUpUser.pop(i.user.id);
    //    //    singedUpCounter--;
    //    //  } else {
    //    //    await i.reply({
    //    //      content: "You are not in ths party dummy!!!!!",
    //    //      ephemeral: true,
    //    //    });
    //    //  }
    //    //}
    //  } catch (error) {
    //    console.log(error);
    //  }
    //  console.log(signedUpUser);
    //  console.log(singedUpCounter);
    //});

    counter++;
    //collector.on("end", (collection) => {
    //  collection.forEach((click) => {
    //    console.log(click.user.id, click.customId);
    //  });
    //  interaction.editReply({
    //    content: "wow",
    //    components: [],
    //  });
    //});
    //
  },
};
