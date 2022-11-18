const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const warnModel = require("../../Structures/Schema/WarningDB");

module.exports = {
    name: "warn-add",
    description: "warn a user",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "target",
            description: "Provide a user to warn.", // Change able
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Provide a reason to warn this user", //Change able.
            type: "STRING",
        },
    ],

   /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction) {
        const { options, guild } = interaction;
        const reason = options.getString("reason") || "No reason provided";
        const target = options.getMember("target");

        new warnModel({
            userId: target.id,
            guildId: interaction.guild.id,
            moderatorId: interaction.user.id,
            reason,
        }).save();

        const Embed = new MessageEmbed()
        .setColor("#303236")
        .setThumbnail(target.user.avatarURL({ dynamic: true }))
        .setDescription(`<:approved:941879734768398337> Warned ${target} reason:\`${reason}\``)
        let message = interaction.reply({embeds: [Embed]})

        const DM = new MessageEmbed()
        .setColor("#303236")
        .setDescription(`⚠️ You have been warned on ${interaction.guild.name} with the reason of:\`${reason}\``)
        target.send({embeds: [DM]}).catch(()=>{console.log("⛔ Private message blocked by the user")});
      
    }
}