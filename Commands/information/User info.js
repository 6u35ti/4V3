const { CommandInteraction, MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");
module.exports = {
    name: "userinfo",
    description: "Displays the userinfo of the specified target.",
    options: [
        {
            name: "target",
            description: "Select the target.",
            type: "USER",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const target = interaction.options.getMember("target") || interaction.member;
        await target.user.fetch();
        const getPresence = (status) => {
            const statusType = {
                idle: "1FJj7pX.png",
                dnd: "fbLqSYv.png",
                online: "JhW7v9d.png",
                invisible: "dibKqth.png"
            };

            return `https://i.imgur.com/${statusType[status] || statusType["invisible"]}`;
        };
        const row1 = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setURL(`https://discord.com/users/${target.user.id}`)
                .setEmoji('827619892277674025')
                .setLabel('Check User Profile Link'))

        const response = new MessageEmbed()
            .setColor("#303236")
            .setAuthor({ name: target.user.tag, iconURL: getPresence(target.presence?.status) })
            //.setThumbnail(target.user.avatarURL({ dynamic: true }))
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .addFields(
                // { name: "User Tag", value: target.user.discriminator }, << damo with out || inline ||
                { name: "User Name", value: `${target.user.username}`, inline: true },
                { name: "ID", value: `${target.user.id}`, inline: true },
                { name: "User Tag", value: target.user.discriminator },
                { name: "Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R> - <t:${parseInt(target.joinedTimestamp / 1000)}:d>`, inline: false },
                { name: "Account Created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R> - <t:${parseInt(target.user.createdTimestamp / 1000)}:d>`, inline: false },
                { name: "Roles", value: target.roles.cache.map(r => r).sort((a, b) => b.position - a.position).join(" ").replace("@everyone", "") || "None" },
                { name: "Nickname", value: target.nickname || "None", inline: true },
                { name: "Accent Colour", value: target.user.accentColor ? `#${target.user.accentColor.toString(16)}` : "None", inline: true },
               // { name: "Banner", value: target.user.bannerURL() ? "** **" : "None" }
            );
        interaction.reply({ embeds: [response], components: [row1], ephemeral: false });
    }
}