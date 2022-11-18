const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: "dank",
  description: "Shows Dank Memer Communities.",

  async execute(interaction, client) {
    const dnk1 = new MessageActionRow()
      .addComponents(
          
        new MessageButton()
        .setStyle('LINK')
        .setURL(`https://discord.gg/kKamwbhnDx`) //https://discord.gg/ryfxxx
        .setEmoji('<:dankmemer:991550283350020096>')
        .setLabel('Rich Memerz'),
        
        new MessageButton()
          .setLabel(`0wner: 6ú35†i#1526`)
        .setStyle('SECONDARY')
          .setCustomId(`1`)
          .setDisabled(true),

        
      )
    let dank = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: '', url: '' })
      .setColor("#303236")
      .setDescription(`Invitation Links to Dank Memer Communities.`)
    
 /**\n\n Hay,<@${interaction.user.id}> Make Sure To Join My Server. ( [<:joi:990245169993515018><:ngu:990245165161644032><:ild:990245167770533959>](https://discord.gg/AdPwZbsn6c) ) < just click join emoji\n\n*Invite Rules, if your server does not have \` 50 \` + Member. Then me ${client.user.username} automaticly leave your server.*`)*/

    interaction.reply({ embeds: [dank], components: [dnk1] })
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