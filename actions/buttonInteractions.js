const {
  Client,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    console.log(interaction);
    //console.log(number);

    if (interaction.customId.match(/(Join)/i)) {
      if (interaction.message.includes(`${interaction.user.username}`)) {
        interaction.update({
          content: `${interaction.message} ${interaction.user.username}`,
        });
      } else {
        return interaction.reply({
          content: `🚫 You already registered!`,
          ephemeral: true,
        });
      }
    }
  });
};
