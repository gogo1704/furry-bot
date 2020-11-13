module.exports = {
	name: "gay",
	description: "Shows all gay people on the server.",
    allowPM: true,
	execute(message, args) {
		message.channel.send("Currently only <@535912931469033484> is gay on this server.");
	}
};
