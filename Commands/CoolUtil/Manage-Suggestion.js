const { CommandInteraction, Client, MessageEmbed } = require(`discord.js`);
const DB = require("../../Structures/Schema/SuggestDB");

module.exports = {
    name: `suggestion-manage`,
    description: `Control your suggestions`,
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "message_id",
            description: "Provide a messageID",
            type: "STRING",
            required: true
        },
        {
            name: "options",
            description: "Accept or decline the suggestion",
            type: "STRING",
            required: true,
            choices: [
                { name: "Accept", value: "accept" },
                { name: "Decline", value: "decline" }
            ]
        },
        {
            name: "reason",
            description: "Provide a reason",
            type: "STRING"
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options, guild } = interaction;
        const MessageID = options.getString("message_id");
        const Options = options.getString("options");
        const Reason = options.getString("reason") || "No reason provided";
        const Embed = new MessageEmbed();

        if (Reason.length > 1024) {
            Embed
                .setColor("#303236")
                .setDescription(`<:denied:941879735200382986> Reason cannot exceed 1024 characters`);
            return interaction.reply({embeds: [Embed], ephemeral: true});
        }

        const Data = await DB.findOne({ GuildID: guild.id, MessageID: MessageID });
        if (!Data) {
            Embed
                .setColor("#303236")
                .setDescription(`<:denied:941879735200382986> Could not find any suggestion with that messageID`);
            return interaction.reply({embeds: [Embed], ephemeral: true});
        }
        const Member = guild.members.cache.get(Data.MemberID);
        const MessageToEdit = (await interaction.guild.channels.cache.get(Data.ChannelID).messages.fetch(Data.MessageID));

        const NewEmbed = new MessageEmbed()
            .setColor(Options === "accept" ? "GREEN" : "RED")
            .setAuthor({name: `${Member.user.tag} (${Member.user.id})`, iconURL: `${Member.user.displayAvatarURL({dynamic: true})}`})
            .setFooter({text: `User ID: ${Member.user.id}`})
            .addFields(
                {name: "Suggestion", value: Data.Suggestion, inline: false},
                {name: "Status", value: `${Options === "accept" ? "Accepted" : "Declined"}`, inline: true},
                {name: "Reason", value: Reason, inline: true}
            )
            .setFooter({text: `${Options === "accept" ? "Accepted" : "Declined"} By ${interaction.user.tag}`})
            .setTimestamp();
        await MessageToEdit.edit({embeds: [NewEmbed]});
        Embed
            .setColor("#303236")
            .setDescription(`<:approved:941879734768398337> The suggestion has been ${Options === "accept" ? "accepted" : "declined"}`);
        interaction.reply({embeds: [Embed], ephemeral: true});
    },
}