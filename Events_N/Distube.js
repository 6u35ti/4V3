const client = require("../Structures/index");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

//https://distube.js.org/#/docs/DisTube/stable/class/Song?scrollTo=metadata     Document link
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
          
client.distube
  .on('playSong', (queue, song) => queue.textChannel.send({
    embeds: [new MessageEmbed()
      .setColor("#303236")
      .setImage(`${song.thumbnail}`)
      .setTitle(`${song.name}`)
      .setURL(`${song.url}`)
      .setFooter({ text: `${song.views} Views - ${song.likes} Likes | Requested by ${song.user.tag}`})
      .addField(`Volume`, `${queue.volume}%`, true)
      .addField(`Loop Mode`, `${queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Song') : 'Off'}`, true)
      .addField(`Autoplay`, `${queue.autoplay ? 'On' : 'Off'}`, true)
      .addField(`Uploader`, `${song.uploader.name}`, true)
      .addField(`Duration`, `${song.formattedDuration}`, true)
      .addField(`Download Song`, `[Click Here](${song.streamURL})`, true)
      .addField(`Filter`, `\`\`\`${queue.filters.join(', ') || 'Off'}\`\`\``, false),
   ]
   }
  ))


  .on('addSong', (queue, song) => queue.textChannel.send({
    embeds: [new MessageEmbed()
      .setColor("#303236")
      .setDescription(`Added **${song.name}** [ ${song.formattedDuration} Minutes ] to the queue by ${song.user}`)]
  }
  ))

  .on('addList', (queue, playlist) => queue.textChannel.send({
    embeds:
      [new MessageEmbed()
        .setColor("#303236")
        .setDescription(`Added **${playlist.name}** playlist [ ${playlist.songs.length} Songs ] to queue by ${playlist.user}`)
      ]
  }
  ))

  .on('error', (channel, e) => {
    channel.send({
      embeds: [new MessageEmbed().setColor("#303236")
        .setDescription(`An error encountered: ${e}`)]
    })
  })

  .on('empty', queue => queue.textChannel.send({
    embeds: [new MessageEmbed().setColor("#303236")
      .setDescription('Voice channel is empty! Leaving the channel...')]
  }
  ))

  .on('searchNoResult', message => message.channel.send({
    embeds: [new MessageEmbed()
      .setColor("#303236")
      .setDescription(`No result found for`)]
  }))

  .on('finish', queue => queue.textChannel.send({
    embeds: [new MessageEmbed()
      .setColor("#303236")
      .setDescription(`Queue finished! leaving the channel...`)]
  }
  ))