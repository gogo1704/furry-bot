module.exports = {
	name: "welcome",
	description: "Sends a welcome message. (used for debbuging)",
	execute(message, args) {
		message.client.emit("guildMemberAdd", message.member);
	}
};