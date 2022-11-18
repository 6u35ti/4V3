const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const warnModel = require("../../Structures/Schema/WarningDB");
const moment = require("moment");

module.exports = {
    name: "warn-check",
    description: "display the warnings a user has",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "target",
            description: "Provide a user to view their warnings",
            type: "USER",
            required: true,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
     async execute(interaction) {
        const user = interaction.options.getUser("target");
        const userWarnings = await warnModel.find({ userId: user.id, guildId: interaction.guild.id});
        const er = new MessageEmbed()
        .setTitle("User warinfo")
        .setColor("#303236")
        .setDescription(`<:denied:941879735200382986> ${user} has no warings`);

        if(!userWarnings?.length) return interaction.reply({ embeds: [er], ephemeral: true});
        const embedDescription = userWarnings.map((warn) =>{
            const moderator = interaction.guild.members.cache.get(
                warn.moderatorId
            );
            return [
                `warnId: ${warn.id}`,
                `Moderator: ${moderator || "Has left"}`,
                `Reason: ${warn.reason}`,
        ].join("\n");
        }) .join("\n\n");

        const embed = new MessageEmbed()
        .setTitle(`${user.tag}'s warings`)
        .setDescription(embedDescription)
        .setColor("#303236")

        interaction.reply({ embeds: [embed]})
    }
}