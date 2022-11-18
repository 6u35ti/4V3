const { CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require("../../Structures/Schema/LockDown");

module.exports = {
    name: "unlock",
    description: "unLock this channel for lockdown.",
    permission: "MANAGE_CHANNELS",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, channel } = interaction;
        if (!interaction.guild.me.permissions.has("ADMINISTRATOR"))
        //
        {
            const Embed = new MessageEmbed()
                .setColor("#303236")
                .setDescription(`<:denied:941879735200382986> I dont have \`"ADMINISTRATOR"\` permission to execute this command!`)
            return interaction.reply({ embeds: [Embed], ephemeral: true })
        }
        //
        //return interaction.reply({ content: `I dont have \`"ADMINISTRATOR"\` permission to execute this command!` })

        const Embed = new MessageEmbed();
        if (channel.permissionsFor(guild.id).has("SEND_MESSAGES"))
            return interaction.reply({
                embeds: [
                    Embed.setColor("#303236").setDescription(
                        "📛  | This channel is not locked"
                    ),
                ],
                ephemeral: true,
            });

        channel.permissionOverwrites.edit(guild.id, {
            SEND_MESSAGES: null,
        });
        await DB.deleteOne({ ChannelID: channel.id });

        interaction.reply({
            embeds: [
                Embed.setColor("#303236").setDescription(
                    "🔓 | Lockdown has benn lifted."
                ),
            ],
        });
    },
};