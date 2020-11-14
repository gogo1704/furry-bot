module.exports = {
	name: "hug",
	description: "Hug someone!",
	args: true,
	usage: "<@user>",
	execute(message, args) {
		const user = message.mentions.users.first();
		if (message.guild.member(user)) {
				if(user) {
					message.channel.send(`:hugging: ${message.author} hugs ${user}! :hugging:`);
				}
        }
	}
};