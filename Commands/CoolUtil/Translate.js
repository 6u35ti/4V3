const { CommandInteraction, MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
    name: "translation",
    description: "Check server names of the bot",
    options: [
        {
            name: "messages",
            description: "translate your messages in english",
            type: "STRING",
            required: true,
        },

    ],
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const query = interaction.options.getString("messages")
        const translated = await translate(query, {to : 'en'})

        if (!query) return interaction.reply(" Please provide a text message")
       
        const trans = new MessageEmbed()
            .setColor("#303236")
            .addFields(`Raw`, `${query}`, false )
            .addFields(`Translated`, `${translated.text}` , false)
        interaction.reply({ embeds: [trans] });
    }
}