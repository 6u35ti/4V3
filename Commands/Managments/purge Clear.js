const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Purge/Delete messages in the channel",
  permission: "MANAGE_CHANNELS",
  options: [
    {
      name: "amount",
      description: "Amount of messages to purge.",
      type: "INTEGER",
      maxValue: 100,
      minValue: 1,
      required: true,
    },
    {
      name: "member",
      description: "Purge this members messages.",
      type: "USER",
      required: false,
    },
    {
      name: "word",
      description: "Purge the messages that has this word.",
      type: "STRING",
      required: false,
    },
  ],
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    const member = interaction.options.getMember("member");
    const word = interaction.options.getString("word");
    const messages = await interaction.channel.messages.fetch({
      limit: amount,
    });


    if (member) {
      const memberMessages = messages.filter((m) => m.author.id === member.id);
      const purged = await interaction.channel.bulkDelete(memberMessages, true);

      const embed = new MessageEmbed()
        .setDescription(
          `Purged: purged ${purged.size} message${purged.size > 1 ? "s" : ""
          } from ${member.user.tag}`
        )
        .setColor("#303236");
      interaction.reply({ embeds: [embed], ephemeral: true });


    } else if (word) {
      const filteredWord = messages.filter((m) =>
        m.content.toLowerCase().includes(word)
      );
      const purged = await interaction.channel.bulkDelete(filteredWord, true);
      const embed = new MessageEmbed()
        .setDescription(
          `Purged: purged ${purged.size} message${purged.size > 1 ? "s" : ""
          } that contains ${word.toLowerCase()}`
        )
        .setColor("#303236");
      interaction.reply({ embeds: [embed], ephemeral: true });

      // delete word
    } else if (member && word) {
      const memberMessages = messages.filter((m) => m.author.id === member.id && m.content.toLowerCase().includes(word));
      const purged = await interaction.channel.bulkDelete(memberMessages, true);
      const embed = new MessageEmbed()
        .setDescription(
          `Purged: purged ${purged.size} message${purged.size > 1 ? "s" : ""
          } that contains ${word.toLowerCase()} from ${member.user.tag}`
        )
        .setColor("#303236");
      interaction.reply({ embeds: [embed], ephemeral: true });

      // full purge message
    } else {
      const purged = await interaction.channel.bulkDelete(messages, true);
      const embed = new MessageEmbed()
        .setDescription(
          `Purged: purged ${purged.size} message${purged.size > 1 ? "s" : ""
          } in the channel`
        )
        .setColor("#303236");
      interaction.reply({ embeds: [embed], ephemeral: true });

    }
  },
};

/*
const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "purge",
    description: "delete message on this channel.",
    permission: "MANAGE_CHANNELS",
    options: [
        {
            name: 'amount',
            description: 'amount the message if want to delete this channel.',
            type: "INTEGER",
            required: true,
        },
    ],
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has("MANAGE_MESSAGES"))
        //
        {
            const Embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`<:denied:941879735200382986> I dont have \`"MANAGE_MESSAGES"\` permission to execute this command!`)
            return interaction.reply({ embeds: [Embed], ephemeral: true })
        }
        //
        // return interaction.reply({ content: `I dont have "MANAGE_MESSAGES" to execute this command!`, ephemeral: true })

        let amount = interaction.options.getInteger("amount")

        if (amount < 1) {
            const invEembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`<:denied:941879735200382986> Please Specify a valid amount between 1 - 100!`)
            return interaction.reply({ embeds: [invEembed], ephemeral: true })
        }

        if (amount > 100) {
            const onlyEembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`<:denied:941879735200382986> I can only delete 100 messages once!!`)
            return interaction.reply({ embeds: [onlyEembed], ephemeral: true })
        } else {
            try {
                let { size } = await interaction.channel.bulkDelete(amount, true)

                const DeleteEembed = new MessageEmbed()
                    .setColor("#303236")
                    .setDescription(`<:approved:941879734768398337> Successfully Deleted ${size} messages.`)

                await interaction.reply({ embeds: [DeleteEembed], ephemeral: true })
            } catch (e) {
                console.log(e)
                const oldEembed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`<:denied:941879735200382986> I cant delete messages that is older than 14 days.`)
                interaction.reply({ embeds: [oldEembed], ephemeral: true })
            }
        }
    }
};
*/