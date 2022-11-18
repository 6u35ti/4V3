const { Client, MessageEmbed, CommandInteraction } = require("discord.js")
const { connection } = require("mongoose")
require("../../Events/Client/ready")
const { EmbSucc } = require("../../Structures/config.json") //embed color

module.exports = {
    name: "status",
    description: "Displays the current status of the bot",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
       
        const Response = new MessageEmbed()
            .setColor(EmbSucc)
            .setTitle("STATUS")
            .setDescription(`**Client:** \`🟢 ONLINE \`\n**Speed:** \`${client.ws.ping}ms\`\n**Database:** \`${switchTo(connection.readyState)}\`\n**Total Server:** ${client.guilds.cache.size} / **Total member:** ${client.users.cache.size}`) 
            .addFields({name:`_ _`, value:`**\`Uptime: \`**<t:${parseInt(client.readyTimestamp / 1000)}:R>\n**\`Date: \`**<t:${parseInt(client.readyTimestamp / 1000)}:d> - ( <t:${parseInt(client.readyTimestamp / 1000)}:D> )\n**\`Clock: \`**<t:${parseInt(client.readyTimestamp / 1000)}:t>`, inline:false})
            .setTimestamp()

        return interaction.reply(({ embeds: [Response] }))
    }
}

function switchTo(val) {
    var status = " "

    switch (val) {
        case 0: status = `🔴 DISCONNECTED `
            break;

        case 1: status = `🟢 CONNECTED `
            break;

        case 2: status = `🟡 CONNECTING `
            break;

        case 3: status = `🟠 DISCONNECTING `
            break;
    }
    return status
}