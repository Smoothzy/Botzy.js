const discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord.js");

let joinBtns = [];
let leaveBtns = [];
let counter = 0;

module.exports = {
  category: "Group",
  description: "Replies with pong",
  slash: true,
  testOnly: true,
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
          time: 1000 * 1000,
        });

        let singedUpCounter = 0;
        let signedUpUser = [];
        signedUpUser.push(interaction.user.id);
        collector.on("collect", async (i) => {
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

        collector.on("end", (collection) => {
          interaction.editReply({
            components: [],
          });
        });
      });

    counter++;
  },
};
