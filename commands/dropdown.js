const discord = require("discord.js");
const { MessageSelectMenu } = require("discord.js");

module.exports = {
  category: "Roles",
  description: "Set main class",

  slash: "both",
  permissions: ["BAN_MEMBERS"],

  callback: ({ message, interaction }) => {
    const options = [
      {
        label: "Berserker",
        value: "935221492617211994",
      },
      {
        label: "Paladin",
        value: "935221572124434612",
      },
      {
        label: "Gunlancer",
        value: "935221644958531654",
      },
      {
        label: "Striker",
        value: "935221717629009950",
      },
      {
        label: "Wardancer",
        value: "935221756766060574",
      },
      {
        label: "Scrapper",
        value: "935221777196539946",
      },
      {
        label: "Soulfist",
        value: "935221795949252608",
      },
      {
        label: "Gunslinger",
        value: "935221841755263077",
      },
      {
        label: "Artillerist",
        value: "935221871652245594",
      },
      {
        label: "Deadeye",
        value: "935221909249986620",
      },
      {
        label: "Sharpshooter",
        value: "935221929776939038",
      },
      {
        label: "Sorceress",
        value: "935221992532103199",
      },
      {
        label: "Bard",
        value: "935221971413778462",
      },
      {
        label: "Shadownhunter",
        value: "935222020831080549",
      },
      {
        label: "Deathblade",
        value: "935222103991541901",
      },
    ];

    const row = new discord.MessageActionRow();
    row.addComponents(
      new MessageSelectMenu()
        .setCustomId("class_roles")
        .setMinValues(0)
        .setMaxValues(1)
        .setPlaceholder("Select your main class...")
        .addOptions(options)
    );

    if (message) {
      message.reply({
        content: "Select your main class here",
        components: [row],
      });
      return;
    }

    interaction.reply({
      content: "Select your main class here",
      components: [row],
    });
  },
};
