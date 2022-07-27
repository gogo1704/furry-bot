module.exports = {
	name: "ufat",
	description: "Make someone fat!",
	args: true,
	usage: "<@user>",
	execute(message, args) {
		const user = message.mentions.users.first();
		if (message.guild.member(user)) {
				message.channel.send(user.avatarURL());
        }
	}
};