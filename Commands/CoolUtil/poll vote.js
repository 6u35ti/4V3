const { CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
        name: "poll",
        description: "Creates a poll of your choice!",
        permission: "MANAGE_MESSAGES",
        options: [
            {
                name: "title",
                description: "Option 1 of poll",
                type: "STRING",
                required: true,
            },
            {
                name: "option1",
                description: "Title of the poll",
                type: "STRING",
                required: true,
            },
            {
                name: "option2",
                description: "Title of the poll",
                type: "STRING",
                required: true,
            },
            {
                name: "option3",
                description: "Title of the poll",
                type: "STRING",
                required: false,
            },
            {
                name: "option4",
                description: "Title of the poll",
                type: "STRING",
                required: false,
            },
            {
                name: "option5",
                description: "Title of the poll",
                type: "STRING",
                required: false,
            }
     ],

    async execute(interaction) {
        let title =       interaction.options.getString('title');
        let optionOne =   interaction.options.getString('option1');
        let optionTwo =   interaction.options.getString('option2');
        let optionThree = interaction.options.getString('option3');
        let optionFour =  interaction.options.getString('option4');
        let optionFive =  interaction.options.getString('option5');
        

        if (!optionFive) {
            if (!optionFour) {
                if (!optionThree) {
                    const lvlone = new MessageEmbed()
                        .setTitle(`${title}`)
                        .setDescription(`:one: : ${optionOne}\n:two: : ${optionTwo}`)
                        .setFooter({ text: `This poll was submitted by: ${interaction.user.tag}`, iconURL: '' })
                        .setColor("#303236")
                        .setTimestamp()

                    await interaction.reply({ content: 'Creating Poll', ephemeral: true })

                    const onelvl = await interaction.channel.send({ embeds: [lvlone] })
                    await onelvl.react('1️⃣')
                    await onelvl.react('2️⃣')
                } else {
                    const lvltwo = new MessageEmbed()
                        .setTitle(`${title}`)
                        .setDescription(`:one: : ${optionOne}\n:two: : ${optionTwo}\n:three: : ${optionThree}`)
                        .setFooter({ text: `This poll was submitted by: ${interaction.user.tag} `, iconURL: '' })
                        .setColor("#303236")
                        .setTimestamp()

                    await interaction.reply({ content: 'Creating Poll', ephemeral: true })

                    const twolvl = await interaction.channel.send({ embeds: [lvltwo] })
                    await twolvl.react('1️⃣')
                    await twolvl.react('2️⃣')
                    await twolvl.react('3️⃣')
                }
            } else {
                const lvlthree = new MessageEmbed()
                    .setTitle(`${title}`)
                    .setDescription(`:one: : ${optionOne}\n:two: : ${optionTwo}\n:three: : ${optionThree}\n:four: : ${optionFour}`)
                    .setFooter({ text: `This poll was submitted by: ${interaction.user.tag}`, iconURL: '' })
                    .setColor("#303236")
                    .setTimestamp()

                await interaction.reply({ content: 'Creating Poll', ephemeral: true })

                const threelvl = await interaction.channel.send({ embeds: [lvlthree] })
                await threelvl.react('1️⃣')
                await threelvl.react('2️⃣')
                await threelvl.react('3️⃣')
                await threelvl.react('4️⃣')
            }
        } else {
            const lvlfour = new MessageEmbed()
                .setTitle(`${title}`)
                .setDescription(`:one: : ${optionOne}\n:two: : ${optionTwo}\n:three: : ${optionThree}\n:four: : ${optionFour}\n:five: ${optionFive}`)
                .setFooter({ text: `This poll was submitted by: ${interaction.user.tag} `, iconURL: '' })
                .setColor("#303236")
                .setTimestamp()

            await interaction.reply({ content: 'Creating Poll', ephemeral: true })

            const fourlvl = await interaction.channel.send({ embeds: [lvlfour] })
            await fourlvl.react('1️⃣')
            await fourlvl.react('2️⃣')
            await fourlvl.react('3️⃣')
            await fourlvl.react('4️⃣')
            await fourlvl.react('5️⃣')
        }
    }
}

