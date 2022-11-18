const { Client, MessageEmbed, Guild } = require("discord.js")
const { Embedcolor } = require("../../Structures/config.json") //embed color
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,

  execute(client) {
    console.log("🟢 Successfully online")
    client.user.setActivity(`6ú35†¡ x sh3ee`, { type: "WATCHING" }); 

    //client.user.setActivity(`SapphireCloud`, { type: "WATCHING" }); 
    require("../../Systems/LockdownSystem")(client);
    const { Client, Collection } = require("discord.js");


    // bot ping = bot send messsage 
    client.on('messageCreate', async (message) => {
      if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
        //
        return message.reply({
          embeds: [new MessageEmbed()
            .setDescription(`**Hello !!**`)
            .setColor(Embedcolor)], ephemeral: true
        })
      }
    })
    //bot ping = bot send messsage


    //mongo db or database connection
    if (!process.env.Database) return;
    mongoose.connect(process.env.Database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("🍁 Succesfuly connected to the database!")
    }).catch((err) => {
      console.log(err)
    });
  }
}
