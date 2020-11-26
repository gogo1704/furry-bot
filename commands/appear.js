module.exports = {
	name: "appear",
	description: "Makes a wild creature appear on the server.",
    usage: "<creature>",
    allowPM: true,
	execute(message, args) {
        const word = args.join(" ");

            message.channel.send(`Wild ${word} has appeared on the server!`);
	}
};
