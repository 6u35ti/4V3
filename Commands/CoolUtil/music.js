const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "music",
    description: "play, pause, stop, loop, shuffle and many more music commands",
    options: [
        {
            name: "play",
            description: "play a song",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "query",
                    description: "provide the song name or music url",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "volume",
            description: "change the song volume!",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "percent",
                    description: "provide Volume percent if your song! ( 1 - 100 )",
                    type: "INTEGER",
                    required: true
                }
            ]
        },
        {
            name: "settings",
            description: "select an option!",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "select an option! and continue",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "Skip Song",
                            value: "skip"
                        },
                        {
                            name: "Pause song",
                            value: "pause"
                        },
                        {
                            name: "Resume Song",
                            value: "resume"
                        },
                        {
                            name: "Stop Song",
                            value: "stop"
                        },
                        {
                            name: "View Queue",
                            value: "queue"
                        },
                        {
                            name: "Shuffle Queue",
                            value: "Shuffle"
                        },
                        {
                            name: "Toggle Autoplay",
                            value: "autoplay"
                        },
                        {
                            name: "Add Related Song",
                            value: "relatedsong"
                        },
                        {
                            name: "Toggle Repeat Mode",
                            value: "repeatmode"
                        },
                      {
                        name: "Filters",
                        value: "filters"
                      },
                    ]
                }
            ]
        },
    ],


    async execute(interaction, client) {

        const { options, guild, member, channel } = interaction
        const VoiceChannel = member.voice.channel
        if (!VoiceChannel) return Error(interaction, "You need to join a voice channel first to use this commnads.")

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return Error(interaction,
            `Music is already being played in ${guild.me.voice.channel}, you need to join in the same voice channel where i am playing a music!`)

        try {

            switch (options.getSubcommand()) {
                case "play": {
                    client.distube.play(VoiceChannel, options.getString("query"), {
                        textChannel:
                            channel, member: member
                    })
                    return interaction.reply({embeds: [
                            new MessageEmbed()
                            .setColor("#303236").setDescription(`🎶 -Request received!`)
                        ],
                        ephemeral: true
                    })
                }

                case "volume": {
                    const Volume = options.getInteger("percent")

                    if (Volume > 100 || Volume < 1) return Error(interaction, `The volume Value Must be Between 1 - 100`)

                    client.distube.setVolume(VoiceChannel, Volume)

                    return interaction.reply({embeds: [
                            new MessageEmbed()
                            .setColor("#303236").setDescription(`!! volume is now set To **${Volume}**`)
                        ],
                        //ephemeral: true
                    })
                }

                case "settings": {

                    const queue = await client.distube.getQueue(VoiceChannel)
                    if (!queue) return Error(interaction, `There is no Active Queue`)

                    switch (options.getString("options")) {

                        case "skip": {
                            await queue.skip(VoiceChannel)
                            return interaction.reply({embeds: [
                                    new MessageEmbed()
                                    .setColor("#303236").setDescription(`Skipped the current song`)
                                ],
                                //ephemeral: true
                            })
                        }
                        case "stop": {
                            await queue.stop(VoiceChannel)
                            return interaction.reply({embeds: [
                                    new MessageEmbed()
                                    .setColor("#303236").setDescription(`Music has been stopped in this server`)
                                ],
                                //ephemeral: true
                            })
                        }
                        case "pause": {
                            await queue.pause(VoiceChannel)
                            return interaction.reply({embeds: [
                                    new MessageEmbed()
                                    .setColor("#303236").setDescription(`Music has been paused in this server`)
                                ],
                                //ephemeral: true
                            })
                        }
                        case "resume": {
                            await queue.resume(VoiceChannel)
                            return interaction.reply({embeds: [
                                    new MessageEmbed()
                                    .setColor("#303236").setDescription(`Music has been resume in this server`)
                                ],
                                //ephemeral: true
                            })
                        }

                        case "Shuffle": {
                            await queue.shuffle(VoiceChannel)
                            return interaction.reply({embeds: [
                                    new MessageEmbed().setColor("#303236").setDescription(`Music has been shuffle`)
                                ],
                                //ephemeral: true
                            })
                        }

                        case "autoplay": {
                            let Mode = await queue.toggleAutoplay(VoiceChannel)
                            return interaction.reply({embeds: [
                                    new MessageEmbed().setColor("#303236").setDescription(`🔁 Auto play mode is set to **${Mode ? "On" : "Off"}**`)
                                ],
                                //ephemeral: true
                            })
                        }

                        case "relatedsong": {

                            await queue.addRelatedSong(VoiceChannel)
                            return interaction.reply({embeds: [
                                    new MessageEmbed()
                                        .setColor("#303236")
                                        .setDescription(`Related song has been added to the queue.`)
                                ],
                                //ephemeral: true
                            })
                        }

                        case "repeatmode": {

                            let Mode2 = await client.distube.setRepeatMode(queue)
                            return interaction.reply({embeds: [
                                    new MessageEmbed()
                                        .setColor("#303236")
                                        .setDescription(`🔁 Repeat
                                        mode is set to **${Mode2 = Mode2 ? Mode2 === 2 ? "Queue" :
                                            "Song" : "Off"}**`)
                                ],
                                //ephemeral: true
                            })
                        }

                        case "queue": {
                            return interaction.reply({embeds: [
                                    new MessageEmbed().setColor("#303236").setTitle(`Queue of ${interaction.guild.name}`)
                                        .setImage(`${song.thumbnail}`)
                                        .setDescription(`${queue.songs.map(
                                        (song, id) => `\n**${id + 1}**. \`${song.name}\` - \`${song.formattedDuration}\` `)}`)
                                        .setFooter({ text: `Queue of AVEM.` })
                                        .setTimestamp()
                                ],
                                //ephemeral: true
                            })
                        }
                        case "filters": {
                            let Mode = await queue.filter(VoiceChannel)
                            return interaction.reply({embeds: [
                                    new MessageEmbed().setColor("#303236").setDescription(` Filter is set to **${Mode ? "Nightcore" : "bassboost"}**`)
                                ],
                                //ephemeral: true
                            })
                        }

                    }
                    return
                }
            }
        } catch (err) {
            return Error(interaction, `Alert: ${err}`)
        }
    }
}

function Error(interaction, description) {
    interaction.reply({
        embeds: [
            new MessageEmbed().setColor("#303236").setDescription(`!! - ${description}!`)
        ],
        ephemeral: true
    })
}