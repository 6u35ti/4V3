const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");

/**
 * @param {Client} Client
 */
module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("Command Loaded");

  CommandsArray = [];

  (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
    const command = require(file);

    if (!command.name)
      return Table.addRow(file.split("/")[7], "🟤 FAILED", "Missing a name.")

    if (!command.context && !command.description)
      return Table.addRow(command.name, "🟣 FAILED", "Missing a description.")

    if (command.permission) {
      if (Perms.includes(command.permission))
        command.default_member_permissions = false
      else
        return Table.addRow(command.name, "🔴 FAILED", "Permission is invalid.")
    }

    client.commands.set(command.name, command);
    CommandsArray.push(command);

    await Table.addRow(command.name, "🟢 Successful load.");
  });

  console.log(Table.toString());

  client.on("ready", async () => {
    setInterval(() => {
      client.guilds.cache.forEach((g) => {
        g.commands.set(CommandsArray)
      })
    }, 10000)
  })
};
