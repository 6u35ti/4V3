const { CommandInteraction, MessageEmbed } = require("discord.js")
module.exports = {
    name: "embed",
    description: "Generate a custom embed!",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "embed",
            description: "Generate a custom embed!.",
            type: "SUB_COMMAND",
            options: [
                { name: "colour", description: "Provide a colour for the embed.", type: "STRING"},
                { name: "title", description: "Provide a title for the embed.", type: "STRING"},
                { name: "url", description: "Provide a url for the embed.", type: "STRING"},
                { name: "author", description: "Provide an author for the embed.", type: "STRING"},
                { name: "description", description: "Provide a description for the embed.", type: "STRING"},
                { name: "thumbnail", description: "Provide a thumbnail for the embed.", type: "STRING"},
                { name: "image", description: "Provide an image for the embed.", type: "STRING"},
                { name: "timestamp", description: "Enable timestamp?", type: "BOOLEAN"},
                { name: "footer", description: "Provide a footer for the embed.", type: "STRING"},
                { name: "fields", description: "name^value^inline (true or false)^^", type: "STRING" }
            ]
        },
        {
            name: "help",
            description: "Tutorial on how to use /embed generate.",
            type: "SUB_COMMAND"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;
        const subCommand = options.getSubcommand();

        switch(subCommand) {
            case "generate":
                const eFields     = [[], [], []];
                const splitFields = [];
        
                const colour      = options.getString("colour");
                const title       = options.getString("title");
                const url         = options.getString("url");
                const author      = options.getString("author");
                const description = options.getString("description");
                const thumbnail   = options.getString("thumbnail");
                const image       = options.getString("image");
                const timestamp   = options.getBoolean("timestamp");
                const footer      = options.getString("footer");
                let   fields      = options.getString("fields");

                const embed       = new MessageEmbed();

                if(url && url.includes("http"))             embed.setURL(url);
                if(thumbnail && thumbnail.includes("http")) embed.setThumbnail(thumbnail);
                if(image && image.includes("http"))         embed.setImage(image);
                if(colour)                                  embed.setColor(colour.toUpperCase());
                if(title)                                   embed.setTitle(title);
                if(author)                                  embed.setAuthor({ name: author});//setAuthor(author);
                if(description)                             embed.setDescription(description);
                if(timestamp)                               embed.setTimestamp();
                if(footer)                                  embed.setFooter({ text: footer});//setFooter(footer);
                if(fields) {
                    fields = fields.split("^");
                    fields.forEach(e => {
                        if(e.length > 0) {
                            splitFields.push(e.trim())
                        }
                    });
            
                    let x = 0;
                    for (let i = 0; i < splitFields.length; i++) {
                        if(x == 3) x = 0;
                        eFields[x].push(splitFields[i]);
                        x++;
                    }
                        
                    for (let i = 0; i < eFields[0].length; i++) {
                        embed.addFields(`${eFields[0][i]}`, `${eFields[1][i]}`, JSON.parse(eFields[2][i].toLowerCase()));
                    }
                }

                if(!embed.title && !embed.description && !embed.fields[0]) {
                    //
                    const Embed = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`<:denied:941879735200382986> You have not provided valid options!`)
                    return interaction.reply({ embeds: [Embed], ephemeral: true })
                    // normal message--
                    //embed.setDescription("You have not provided valid options!")
                }
                interaction.reply({embeds: [embed]});
            break;
            case "help":
                const help = new MessageEmbed()
                    .setTitle("/embed help")
                    .setColor("#303236")
                    .setDescription("To send an embed you must provide at least a title, a description or a field.\n\nMost of the commands are fairly self explanitory except the fields command.\nIn order to send fields you must follow the following format:\n\n`title^description^inline^^`\n\nFor example, sending `this is title^ I am AVEM^True^^ Age^18^True^^ Hey^AVEM create embed^False^^` this a Fields system..!!")
                    .addFields(
                        {name: "This is title", value: "I am AVEM", inline: true},
                        {name: "Age", value: "18", inline: true},
                        {name: "Hey", value: "AVEM create embed", inline: false}
                    )    
                interaction.reply({embeds: [help]})
            break;
        }
    }
}