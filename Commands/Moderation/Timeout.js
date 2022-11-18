const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
  name: 'timeout',
  description: 'timeout users',
  permission: "ADMINISTRATOR",
  options: [
    {
      name: 'user',
      description: 'The user to timeout',
      required: true,
      type: 'USER'
    }, {
      name: 'length',
      description: 'The length of timeout like 10s, 1d, 2m',
      required: true,
      type: 'STRING'
    },
    {
      name: 'reason',
      description: 'reason to timeout',
      required: false,
      type: 'STRING'
    }
  ],

  /**
   * 
   * @param {CommandInteraction} interaction 
   */

  execute(interaction) {
    const member = interaction.options.getMember('user');
    const length = interaction.options.getString('length');
    const reason = interaction.options.getString('reason') || "No reason provided";

    if (!interaction.guild.me.permissions.has("MODERATE_MEMBERS"))
    //
    {
      const Embed = new MessageEmbed()
        .setColor("#303236")
        .setDescription(`<:denied:941879735200382986> I dont have \`"MODERATE_MEMBERS"\` permission to execute this command!`)
      return interaction.reply({ embeds: [Embed], ephemeral: true })
    }
    //
    //return interaction.reply({ content: `I dont have \`"MODERATE_MEMBERS"\` permission to execute this command!` })
    if (member.user.id === interaction.user.id) {
      return interaction.reply({ content: 'You cant timeout yourself', ephemeral: true })
    } else if (member.user.id === interaction.client.user.id) {
      return interaction.reply({ content: 'You cant timeout me', ephemeral: true })
    } else if (member.user.id === interaction.guild.ownerId) {
      return interaction.reply({ content: 'You cant timeout the owner', ephemeral: true })
    }
    if (interaction.member.roles.highest.posititon < member.roles.highest.posititon) {
      return interaction.reply({ content: 'You cant timeout someone with higher role than you', ephemeral: true })
    }

    /* 
   if (member.communicationDisabledUntilTimestamp > 8) {
       return interaction.followUp({ content: 'This user is already timedout', ephemeral: false })
      }
    */

    if (!member.moderatable || !member.manageable) {

      //this is embes formate----------
      const invEembed = new MessageEmbed()
        .setColor("#303236")
        .setDescription(`<:denied:941879735200382986> I cant timeout this user`)
      return interaction.reply({ embeds: [invEembed], ephemeral: true })
      // normal message formate ------------
      // return interaction.reply({ content: 'I cant timeout this user', ephemeral: true })
    }

    let time = ms(length);
    if (!time) {
      //
      const Embed = new MessageEmbed()
        .setColor("#303236")
        .setDescription(`<:denied:941879735200382986> Enter valid time!`)
      //
      return interaction.reply({ embeds: [Embed], ephemeral: true })
      // return interaction.reply({ content: 'Enter valid time', ephemeral: true })
    }
    if (time > 2.419e+9) {
      //
      const Embed = new MessageEmbed()
        .setColor("#303236")
        .setDescription(`<:denied:941879735200382986> You cant timeout someone for more than 28 days!`)
      //
      return interaction.reply({ embeds: [Embed], ephemeral: true })
      // return interaction.reply({ content: 'You cant timeout someone for more than 28 days', ephemeral: true })
    } else if (time < 1000) {
      //
      const Embed = new MessageEmbed()
        .setColor("#303236")
        .setDescription(`<:denied:941879735200382986> You cant timeout someone for less than **1**sec!`)
      //
      return interaction.reply({ embeds: [Embed], ephemeral: true })
      //return interaction.reply({ content: 'You cant timeout someone for less than one sec', ephemeral: true })
    }

    member.timeout(time, reason)
    return interaction.reply({
      embeds: [new MessageEmbed()
        .setTitle('<:dada:969324140723056670> A user was timedout')
        .setDescription(`<:958086080811397220:969324140232323182> Timedout ${member}`)
        .addFields(
          {
            name: 'Length',
            value: `${length}`,
            inline: false
          },
          {
            name: 'Reason',
            value: `${reason}`,
            inline: false
          },
        )
        .setColor("#303236")
        .setTimestamp()]
    })
  }
}