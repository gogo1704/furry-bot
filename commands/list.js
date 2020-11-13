const Discord = require("discord.js");

module.exports = {
	name: "list",
	description: "Shows number of online people, bots excluded.",
	execute(message, args) {
		if (message.author.bot) return false;
        let num_all = message.guild.members.cache.filter(member => member.user.bot === false).size;
		let num_online = message.guild.members.cache.filter(member => member.presence.status !== "offline" && member.user.bot === false).size;
		let num_offline = message.guild.members.cache.filter(member => member.presence.status == "offline" && member.user.bot === false).size;
        // console.log(`returning ${num_all}, ${num_online}, ${num_offline}`);

        const embed = new Discord.MessageEmbed()
			.setColor('#ff425f')
			.setTitle(':scroll: List of Members :scroll:')
			.addField('All:',`${num_all}`, true)
			.addField('Online:', `${num_online}`, true)
			.addField('Offline:', `${num_offline}`, true)
            .setTimestamp()
			message.channel.send(embed)
	}
};
