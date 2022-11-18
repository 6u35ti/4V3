const { CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
	name: 'remove-timeout',
	category: "mod",
	description: 'Remove timeout from user.',
	permission: "ADMINISTRATOR",
	options: [
		{
			name: 'user',
			description: 'User to remove timeout from.',
			type: 6,
			required: true,
		},
	],
	async execute(interaction) {
		const member = interaction.options.getMember('user')
		if (!interaction.guild.me.permissions.has("MODERATE_MEMBERS"))
		//
		{
			const Embed = new MessageEmbed()
				.setColor("#303236")
				.setDescription(`<:denied:941879735200382986> I dont have \`"MODERATE_MEMBERS"\` permission to execute this command!`)
			return interaction.reply({ embeds: [Embed], ephemeral: true })
		}
		//
		//return interaction.reply({ content: `I dont have \`"MODERATE_MEMBERS"\` permission to execute this command!` })

		if (!member.isCommunicationDisabled()) {
			//
			const Embed = new MessageEmbed()
				.setColor("#303236")
				.setDescription(`<:denied:941879735200382986> This user is not in timeout!`)
			return interaction.reply({ embeds: [Embed], ephemeral: true })
				//
				//return interaction.reply({content: ':x: This user is not in timeout.',ephemeral: true})
				.catch((e) => { });
		}
		await member.disableCommunicationUntil(null, `By: ${interaction.user.tag}`);
		//
		const Embed = new MessageEmbed()
			.setColor("#303236")
			.setDescription(`<:approved:941879734768398337> Timeout has been removed from This user ${member.user.tag}`)
		return interaction.reply({ embeds: [Embed], ephemeral: true })
		//
		//interaction.reply({ content: ` \`\`\`🕘Timeout has been removed from This user ${member.user.tag}\`\`\` `, ephemeral: true });
	},
};