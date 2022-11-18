const { CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
    name: "unban",
    description: "Unban a user from the guild",
    permission: "BAN_MEMBERS",
    options: [
        {
            name: "user-id",
            description: "User ID to unban",
            required: true,
            type: "STRING",
        },
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction) {
        const userid = interaction.options.getString("user-id");

        if (!interaction.guild.me.permissions.has("BAN_MEMBERS"))
        //
        {
            const Embed = new MessageEmbed()
                .setColor("#303236")
                .setDescription(`<:denied:941879735200382986> I dont have \`"BAN_MEMBERS"\` permission to execute this command!`)
            return interaction.reply({ embeds: [Embed], ephemeral: true })
        }
        //
        //return interaction.reply({ content: `I dont have \`"BAN_MEMBERS"\` permission to execute this command!` })

        if (!userid) return interaction.reply("Please provide a user id first!")
        if (isNaN(userid)) return interaction.reply("The User ID should be an Integer!")

        //
        const bannedMembers = await interaction.guild.bans.fetch()
        if (!bannedMembers.find((user) => user.user.id === userid)) return interaction.reply("The member is not banned!")
        //
        interaction.guild.members.unban(userid).then((userid) => {
            const embed = new MessageEmbed()
                .setDescription(`${userid} success fully unban `)
                .setColor("#303236")
            interaction.reply({ embeds: [embed], ephemeral: true })
        })
    }
}

