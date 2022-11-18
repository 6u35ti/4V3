const { CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require("../../Structures/Schema/LockDown");
const ms = require("ms");

module.exports = {
    name: "lockdown",
    description: "Lock down this voice channel.",
    permission: "MANAGE_CHANNELS",
    options: [
        {
            name: "time",
            description: "Expire date for this lockdown (1s, 1m, 1h, 1d).",
            type: "STRING",
            required: true,
        },
        {
            name: "reason",
            description: "Select the channel Reason why you lock this channel.",
            type: "STRING",
            required: true,
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, channel, options } = interaction;

        if (!interaction.guild.me.permissions.has("ADMINISTRATOR"))
        //
        {
            const Embed = new MessageEmbed()
                .setColor("#303236")
                .setDescription(`<:denied:1038698779035045958>  I dont have \`"ADMINISTRATOR"\` permission to execute this command!`)
            return interaction.reply({ embeds: [Embed], ephemeral: true })
        }
      /**{
            const Embed = new MessageEmbed()
                .setColor("#303236")
                .setDescription(`<:denied:941879735200382986> I dont have \`"ADMINISTRATOR"\` permission to execute this command!`)
            return interaction.reply({ embeds: [Embed], ephemeral: true })
        }*/
        //
        //return interaction.reply({ content: `I dont have \`"ADMINISTRATOR"\` permission to execute this command!` })

        const Reason = options.getString("reason") || "no specified reason"
        const Embed = new MessageEmbed();

        if (!channel.permissionsFor(guild.id).has("SEND_MESSAGES"))
            return interaction.reply({
                embeds: [
                    Embed.setColor("#303236").setDescription(
                        "📛 | This channel is already Locked."
                    ),
                ],
                ephemeral: true,
            });

        channel.permissionOverwrites.edit(guild.id, {
            SEND_MESSAGES: false,
        });
        
        interaction.reply({
            embeds: [Embed.setColor("#303236").setDescription(
                `🔒 | This channel is now under lockdown for: ${Reason}`
            ),
            ],
        });
        const Time = options.getString("time");
        if (Time) {
            const ExpireDate = Date.now() + ms(Time);
            DB.create({ GuildID: guild.id, ChannelID: channel.id, Time: ExpireDate });

            setTimeout(async () => {
                channel.permissionOverwrites.edit(guild.id, {
                    SEND_MESSAGES: null,
                });
                interaction.editReply({
                    embeds: [Embed.setDescription("🔓 | The Lockdown has benn lifted").setColor("#303236"),
                    ],
                })
                    .catch(() => { });
                await DB.deleteOne({ ChannelID: channel.id });
            }, ms(Time));
        }
    },
};