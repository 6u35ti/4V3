const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "role-give",
    description: "Add a role to a user.",
    options: [
        {
            name: "member",
            description: "The member to add the role to.",
            required: true,
            type: "USER"
        },
        {
            name: "role",
            description: "The role to add to the member.",
            required: true,
            type: "ROLE"
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild } = interaction;

        const target = options.getMember("member");
        const role = options.getRole("role");

        if (!interaction.member.permissions.has("MANAGE_ROLES")) {
            interaction.reply("You don't have the permissions to add roles!");
            return;
        }
        if (!guild.me.permissions.has("MANAGE_ROLES")) {
            interaction.reply("I don't have the permissions to add roles!");
            return;
        }
        if (role.position >= interaction.member.roles.highest.position) {
            interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("#303236")
                    .setDescription("You can't add this role!")
                ], ephemeral: true
            });
            return;
        }
        if (target.roles.cache.has(role.id)) {
            interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("#303236")
                    .setDescription("This user already has this role!")
                ], ephemeral: true
            });
            return;
        }
        if (interaction.member.permissions.has("MANAGE_ROLES")) {
            await target.roles.add(role)
            interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("#303236")
                    .setDescription(`Successfully added the role <@&${role.id}> to \`${target.user.tag}\`!`)
                ]
            });
        }
    }
}