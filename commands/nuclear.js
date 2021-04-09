module.exports = {
	name: "nuclear",
	description: "Gives a random nuclear code.",
	args: false,
    allowPM: true,
	execute(message, args) {
		message.channel.send(Math.floor((Math.random() * 254000) + 100000));
	}
};
