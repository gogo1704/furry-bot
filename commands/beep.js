module.exports = {
	name: "beep",
	description: "Beep!",
    allowPM: true,
    cooldown: 20,
	execute(message, args) {
		message.channel.send("Boop!");
	}
};
