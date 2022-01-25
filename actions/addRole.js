const channelName = "+ Create channel 🆕";
var createdChs = [];

module.exports = (client) => {
  client.on("interactionCreate", (interaction) => {
    if (!interaction.isSelectMenu()) {
      return;
    }

    const { customId, values, member } = interaction;

    if (customId === "class_roles") {
      const component = interaction.component;
      const removed = component.options.filter((option) => {
        return !values.includes(option.value);
      });

      const m = member;
      for (const id of removed) {
        m.roles.remove(id.value);
      }

      for (const id of values) {
        m.roles.add(id);
      }

      interaction.reply({
        content: "Main class selected",
        ephemeral: true,
      });
    }
  });
};
