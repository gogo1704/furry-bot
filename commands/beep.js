module.exports = {
	name: "beep",
	description: "Beep!",
    allowPM: true,
	execute(message, args) {
		message.channel.send("Boop!");
	}
};
