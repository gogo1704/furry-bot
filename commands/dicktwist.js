module.exports = {
	name: "dicktwist",
	description: "Twist someone's dick!",
	args: true,
	usage: "<@user>",
	execute(message, args) {
		const user = message.mentions.users.first();
		if (message.guild.member(user)) {
				if(user) {
					message.channel.send(`${message.author} performs a Dick Twist on ${user}!\n It's super effective!`);
				}
        }
	}
};