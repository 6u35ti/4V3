const { CommandInteraction, MessageEmbed } = require('discord.js');
const DB = require("../../Structures/Schema/SuggestDB");

module.exports = {
    name: "suggest",
    description: "Create a suggestion",
    options: [
        {
            name: "suggestion",
            description: "Describe your suggestion",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options, guild, member, user } = interaction;
        const Suggestion = options.getString("suggestion");

        const embed = new MessageEmbed()
            .setColor("#303236")
            .setTitle({name : "SUGGESTION"})
            .setFooter({text: `User ID : ` + user.id})
            .addFields(
                {name: "Requester", value: user.tag, inline: false},
                {name: "Suggestion", value: Suggestion, inline: false},
                {name: "Status", value: "Pending", inline: true},
                {name: "Reason", value: "Pending", inline: true}
            )
            .setTimestamp();
        try {
            const M = await interaction.reply({embeds: [embed], fetchReply: true});
            await M.react("<:ryuucheck:982898883871002625>");
            await M.react("<:ryuucross:982898880414887956>");

            await DB.create({
                GuildID: guild.id,
                MessageID: M.id,
                MemberID: member.id,
                Suggestion: Suggestion,
                ChannelID: interaction.channel.id
            });
        } catch (err) {
            embed
                .setColor("#303236")
                .setDescription(`<:rejected:941879735200382986> An error occurred while trying to make a suggestion`);
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}