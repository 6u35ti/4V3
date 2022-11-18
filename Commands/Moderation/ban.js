const { CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'ban',
    description: 'ban user from the server',
    permission: "ADMINISTRATOR",
    options: [
        {
            name: 'user',
            description: 'The user to timeout',
            required: true,
            type: 'USER'
        },
        {
            name: 'reason',
            description: 'reason from kick user',
            required: true,
            type: 'STRING'
        }
    ],

    async execute(interaction, client) {
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')

        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { })

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

        if (!member) return interaction.reply("😅 | Unable to get details related to given member.");
        
        // if this user does not exist or user has higher role then show this error or 
        if (!member.bannable || member.user.id === client.user.id)
            return interaction.reply("😅 | I am unable to ban this member");
        
        // if user role is equal or same permisson then bot dost ban and show this error
        if (interaction.member.roles.highest.position < member.roles.highest.position)
            return interaction.reply('Given member have higher or equal rank as you so I can not ban them.')

        const embed = new MessageEmbed()
            .setDescription(`**${member.user.tag}** is banned from the server for  \`${reason}\``)
            .setColor("#303236")
            .setFooter({ text: `Ban Member`, iconURL: '' })
            .setTimestamp()

        await member.user.send(`You are banned from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => { })
        member.ban({ reason })

        return interaction.reply({ embeds: [embed] })

    },

}; 
