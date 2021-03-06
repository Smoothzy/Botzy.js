const DiscordJS = require("discord.js");
const WOKCommands = require("wokcommands");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const scalingChannels = require("./actions/scalingChannels");
const addRoles = require("./actions/addRole");
const buttonInteractions = require("./actions/buttonInteractions");
dotenv.config();

const { Intents } = DiscordJS;

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  scalingChannels(client);
  addRoles(client);
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    testServers: ["932374576770461726", "934516360166404126"],
    mongoUri: process.env.MONGO_URI,
  });
});

//buttonInteractions(client);

client.login(process.env.TOKEN);
