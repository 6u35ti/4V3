const { CommandInteraction, MessageEmbed } = require("discord.js")
module.exports = {
        name: 'kick',
        description: 'kick users from server',
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
    
        async execute(interaction,client) {
        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        // if bot dosnt have permission then show this eror.
        if (!interaction.guild.me.permissions.has("KICK_MEMBERS"))
        //
        {
            const Embed = new MessageEmbed()
                .setColor("#303236")
                .setDescription(`<:denied:941879735200382986> I dont have \`"KICK_MEMBERS"\` permission to execute this command!`)
            return interaction.reply({ embeds: [Embed], ephemeral: true })
        }
        // this normal tex message i dont have permission---
        //return interaction.reply({ content: `I dont have \`"KICK_MEMBERS"\` permission to execute this command!` })

        if(!member) return interaction.reply("😅 | Unable to get details related to given member.");
        const reason = interaction.options.getString('reason')
        
        // if this user does not exist or user has higher role then show this error or 
        if(!member.kickable || member.user.id === client.user.id) 
        return interaction.reply("😅 | I am unable to kick this member");
        
        // if user role is equal or same permission then bot dost kick and show this error
        if(interaction.member.roles.highest.position < member.roles.highest.position) 
        return interaction.reply('Given member have higher or equal rank as you so i can not kick them.')
        
        if(role.position >= interaction.member.roles.highest.position) {
            interaction.reply("You can't add this role!");
            return;
        }
        const embed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** is kicked out from the server for \`${reason}\``)
        .setColor("#303236")
        .setFooter({ text: `Kick Member`, iconURL: '' })
        .setTimestamp()

        await member.user.send(`You are kicked from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {})
        member.kick({ reason })

        return interaction.reply({ embeds: [ embed ]})

    },
    
};