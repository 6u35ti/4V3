const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "role-remove",
    description: "Remove a role from a user.",
    permission: "MANAGE_ROLES",
    options: [
        {
            name: "member",
            description: "The member to remove the role from",
            required: true,
            type: "USER"
        },
        {
            name: "role",
            description: "The role to remove from the member",
            required: true,
            type: "ROLE"
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
   async execute(interaction)  {
        const { options, guild } = interaction;
        const target = options.getMember("member");
        const role = options.getRole("role");


        if(!interaction.member.permissions.has("MANAGE_ROLES")) {
            interaction.reply("You don't have the permissions to remove roles!");
            return;
        }
        if(!guild.me.permissions.has("MANAGE_ROLES")) {
            interaction.reply("I don't have the permissions to remove roles!");
            return;
        }
        if(role.position >= interaction.member.roles.highest.position) {
            interaction.reply("You can't remove this role!");
            return;
        }
        if(!target.roles.cache.has(role.id)) {
            interaction.reply("This user doesn't have this role!");
            return;
        }
        if(interaction.member.permissions.has("MANAGE_ROLES")) {
            await target.roles.remove(role)
            interaction.reply(`Successfully removed the role <@&${role.id}> from \`${target.user.tag}\`!`);
        }
    }
};