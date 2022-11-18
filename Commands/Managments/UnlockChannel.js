
const { MessageEmbed, CommandInteraction, Message } = require('discord.js')

module.exports = {
    name: "un_lockchannel",
    description: "locks the current or selected text channels",
    permission: "MANAGE_CHANNELS",
    options: [
        {
            name: 'channel',
            description: 'The user to timeout',
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT", "GUILD_NEWS", "GUILD_VOICE"]
        },
    ],
    async execute(interaction) {
        const channeltolock = interaction.options.getChannel("channel") || interaction.channel;

        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply({ content: `I DOND HAVE PERMS` });

        channeltolock.permissionOverwrites.edit(interaction.guild.id, {
            SEND_MESSAGES: true,
            CONNECT: true,
        }).then(() => {
            let locked = new MessageEmbed()
                .setDescription(` ✅ | **Unlocked Channel**\n> **Channel Name** : <#${channeltolock.id}>\n> **UnLocked By** : <@${interaction.user.id}>`)
                .setColor("#303236")
            interaction.reply({ embeds: [locked] })
        });
    }
}

