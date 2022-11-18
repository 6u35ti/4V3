const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const warnModel = require("../../Structures/Schema/WarningDB");

module.exports = {
    name: "warn-delete",
    description: "warn a user",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "warnid",
            description: "Provide the warning ID you want to remove", 
            type: "STRING",
            required: true,
        },
    ],
   /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
  async execute(interaction) {
      const warnId = interaction.options.getString("warnid")
      const data = await warnModel.findById(warnId);


      const er = new MessageEmbed()
      .setColor("#303236")
      .setDescription(`<:denied:941879735200382986> Woops no warn Id found matching ${warnId}`)
      if(!data) return interaction.reply({embeds:[er], ephemeral: true});

      data.delete();
        const embed = new MessageEmbed()
        .setColor("#303236")
        .setDescription(`<:approved:941879734768398337> Successfully removed the warning with the ID of: \`${warnId}\``)
      const user = interaction.guild.members.cache.get(data.userId)
      return interaction.reply({ embeds: [embed], ephemeral: true})
  }

}