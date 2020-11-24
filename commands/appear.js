module.exports = {
	name: "appear",
	description: "Shows wild creatures that appeared on the server.",
    usage: "<@user|text>",
    allowPM: true,
	execute(message, args) {
        const word = args.join(" ");

            message.channel.send(`Wild ${word} has appeared on the server!`);
	}
};
