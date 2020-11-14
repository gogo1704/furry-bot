const Discord = require("discord.js");

module.exports = {
	name: "list",
	description: "Shows the number of online people within roles, bots excluded.",
    usage: "[role]",
    cooldown: 10,
	execute(message, args) {
        const args_full = args.join(" ");
        if (args_full) {
            const role_find = message.guild.roles.cache.find(role => role.name.toLowerCase() == args_full.toLowerCase());
            if (role_find) {
                const num_all = role_find.members.filter(member => member.user.bot === false).size;
                const num_online = role_find.members.filter(member => member.presence.status !== "offline" && member.user.bot === false).size;
                const num_offline = role_find.members.filter(member => member.presence.status == "offline" && member.user.bot === false).size;

                const embed = new Discord.MessageEmbed()
			     .setColor('#ff425f')
			     .setTitle(':scroll:  List of Members  :scroll:')
                 .setDescription(role_find)
			     .addField('All:', num_all, true)
                 .addField('Online:', num_online, true)
			     .addField('Offline:', num_offline, true)
                 .setTimestamp()
			     message.channel.send(embed);
            }
            else {
                message.channel.send("This role doesn't exist.");
            }
        }
        else {
            const num_all = message.guild.members.cache.filter(member => member.user.bot === false).size;
            const num_online = message.guild.members.cache.filter(member => member.presence.status !== "offline" && member.user.bot === false).size;
		    const num_offline = message.guild.members.cache.filter(member => member.presence.status == "offline" && member.user.bot === false).size;

            const embed = new Discord.MessageEmbed()
			 .setColor('#ff425f')
			 .setTitle(':scroll:  List of Members  :scroll:')
             .setDescription("@everyone")
			 .addField('All:', num_all, true)
             .addField('Online:', num_online, true)
			 .addField('Offline:', num_offline, true)
             .setTimestamp()
			 message.channel.send(embed);
        }
	}
};
