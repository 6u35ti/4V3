const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: "invite",
  description: "Shows information, about new update",

  async execute(interaction, client) {
    const invb1 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('LINK')
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
          .setEmoji('🤷‍♂️')
          .setLabel('invite'),

        new MessageButton()
          .setLabel(`0wner: 6ú35†i#1526`)
          .setStyle('SECONDARY')
          .setCustomId(`1`)
          .setDisabled(true),

          new MessageButton()
        .setStyle('LINK')
        .setURL(`https://discord.gg/SQGtAAR6bf`) //https://discord.gg/ryfxxx
        .setEmoji('🌐')
        .setLabel('Website'),


       
    


      )
    let invite = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: '', url: '' })
      .setColor("#303236")
      .setDescription(`Invite **${client.user.username}** to your discord server!, be sure to read our [documentation](https://discord.gg/SQGtAAR6bf) for guidance.
      **${client.user.username}** is a multi purpose bot which offers moderation Utilities Commands more.`)
//\n\n Hay,<@${interaction.user.id}> Make Sure To Join My Server. ( [<:joi:990245169993515018><:ngu:990245165161644032><:ild:990245167770533959>](https://discord.gg/YeG6VY6p6m) ) < just click join emoji\n\n*Invite Rules, if your server does not have \` 50 \` + Member. Then me ${client.user.username} automaticly leave your server.*

    interaction.reply({ embeds: [invite], components: [invb1] })
  }
}

/*
PRIMARY, a blurple button;
SECONDARY, a grey button;
SUCCESS, a green button;
DANGER, a red button;
LINK, a button that navigates to a URL.

.setDisabled(true) 
*/