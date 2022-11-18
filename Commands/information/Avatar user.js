const { CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
    name: "avatar-user",
    description: "Displays the userinfo of the specified target.",
    options: [
        {
            name: "target",
            description: "Select the target.",
            type: "USER",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const target = interaction.options.getMember("target") || interaction.member;
        const response = new MessageEmbed()
            .setColor("#303236")
            .setAuthor({ name: target.user.tag, iconURL: target.user.avatarURL({ dynamic: true, size: 512 }) })
            .setDescription(`User avatar of: **${target.user.tag}**\n\nTo get a member's server avatar. \n⬇ **Download** \n[Download ${target.user.username}'s avatar](${target.user.avatarURL({ dynamic: true, size: 1024 })})`)
            .setImage(target.user.avatarURL({ dynamic: true, size: 1024 }))

        interaction.reply({ embeds: [response], ephemeral: false });
    }
}