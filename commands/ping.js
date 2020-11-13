module.exports = {
	name: "ping",
	description: "Ping!",
    allowPM: true,
	execute(message, args) {
		message.channel.send("Pong!");
	}
};
