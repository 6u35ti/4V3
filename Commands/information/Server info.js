const { CommandInteraction, MessageEmbed } = require("discord.js");
const moment = require('moment')
module.exports = {
    name: "serverinfo",
    description: "Displays the serverinfo.",
    /**
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const { guild } = interaction;
        const { createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers } = guild;
        const Embed = new MessageEmbed()

            .setColor("#303236") //#303236
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }), url: "https://dsc.gg/" })
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: "<:Mcategory:1041731645377609738> **__SERVER GENERAL INFO__**",
                    value:
                        `
                    - Name : ${guild.name}
                    - Created : <t:${parseInt(createdTimestamp / 1000)}:R> \n${moment.utc(interaction.guild.createdAt).format('LLLL')}
                    - Owner : <@${ownerId}>                  
                    - Description : ${description}
                    - Verification level : ${interaction.guild.verificationLevel}

                    - Total roles : **${guild.roles.cache.size}**                             
                    `
                },
                {
                    name: "<:Mcategory:1041731645377609738> **__SERVER USER INFO__**",
                    value:
                        `
                    - Member : ${members.cache.filter((m) => !m.user.bot).size}
                    - Bots : ${members.cache.filter((m) => m.user.bot).size}
                    
                    - Total : **${memberCount}**                             
                    `
                },
                {
                    name: "<:Mcategory:1041731645377609738> **__SERVER CHANNELS__**",
                    value:
                        `
                    - Text : ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
                    - Voice : ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
                    - Threads : ${channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD").size}
                    - Threads pv : ${channels.cache.filter((c) => c.type === "GUILD_PRIVATE_THREAD").size}
                    - Threads news : ${channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD").size}
                    - Categories : ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
                    - Stages : ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}
                    - News : ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}
                    - Total : **${channels.cache.size}**
                    `
                },
                {
                    name: "<:Mcategory:1041731645377609738> **__EMOJIS & STICKERS__**",
                    value:
                        `
                    - Static :  ${emojis.cache.filter((e) => !e.animated).size}
                    - Animated : ${emojis.cache.filter((e) => e.animated).size}
                    - Stickers : ${stickers.cache.size}
                    - Total : **${stickers.cache.size + emojis.cache.size}**
                    `
                },
                {
                    name: "<:Mcategory:1041731645377609738> **__NITRO STATISTICS__**",
                    value:
                        `
                    - Tire : ${guild.premiumTier.replace("TIER_", "")}
                    - Boosts : ${guild.premiumSubscriptionCount}
                    - Boosters : **${members.cache.filter((m) => m.premiumSince).size}**
                    `
                }
            )
            .setFooter({ text: `Last Checked.`, iconURL: '' }).setTimestamp();
        interaction.reply({ embeds: [Embed] })
    }
}
/**
const Embed = new MessageEmbed()

            .setColor("#303236") //#303236
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }), url: "https://dsc.gg/" })
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: "<:Category:1009422756242272296> **__SERVER GENERAL INFO__**",
                    value:
                        `
                    - Name : ${guild.name}
                    - Created : <t:${parseInt(createdTimestamp / 1000)}:R> \n${moment.utc(interaction.guild.createdAt).format('LLLL')}
                    - Owner : <@${ownerId}>                  
                    - Description : ${description}
                    - Verification level : ${interaction.guild.verificationLevel}

                    - Total roles : **${guild.roles.cache.size}**                             
                    `
                },
                {
                    name: "<:Category:1009422756242272296> **__SERVER USER INFO__**",
                    value:
                        `
                    - Member : ${members.cache.filter((m) => !m.user.bot).size}
                    - Bots : ${members.cache.filter((m) => m.user.bot).size}
                    
                    - Total : **${memberCount}**                             
                    `
                },
                {
                    name: "<:Category:1009422756242272296> **__SERVER CHANNELS__**",
                    value:
                        `
                    - Text : ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
                    - Voice : ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
                    - Threads : ${channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD").size}
                    - Threads pv : ${channels.cache.filter((c) => c.type === "GUILD_PRIVATE_THREAD").size}
                    - Threads news : ${channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD").size}
                    - Categories : ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
                    - Stages : ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}
                    - News : ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}
                    - Total : **${channels.cache.size}**
                    `
                },
                {
                    name: "<:Category:1009422756242272296> **__EMOJIS & STICKERS__**",
                    value:
                        `
                    - Static :  ${emojis.cache.filter((e) => !e.animated).size}
                    - Animated : ${emojis.cache.filter((e) => e.animated).size}
                    - Stickers : ${stickers.cache.size}
                    - Total : **${stickers.cache.size + emojis.cache.size}**
                    `
                },
                {
                    name: "<:Category:1009422756242272296> **__NITRO STATISTICS__**",
                    value:
                        `
                    - Tire : ${guild.premiumTier.replace("TIER_", "")}
                    - Boosts : ${guild.premiumSubscriptionCount}
                    - Boosters : **${members.cache.filter((m) => m.premiumSince).size}**
                    `
                }
            )
*/