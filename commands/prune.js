module.exports = {
  category: "Testing",
  description: "Replies a random number",
  slash: "both",
  testOnly: true,
  minArgs: 1,
  expectedArgs: "<number>",
  expectedArgsTypes: ["NUMBER"],
  callback: async ({ message, channel, interaction, args }) => {
    if (message) {
      await message.delete();
    }
    const ammount = parseInt(args[0]);
    const { size } = await channel.bulkDelete(ammount, true);

    const reply = `Deleted ${size} message(s)`;

    if (interaction) {
      return reply;
    }

    channel.send(reply);
  },
};
