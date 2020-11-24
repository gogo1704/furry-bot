module.exports = {
	name: "reverse",
	description: "Reverse sentence.",
    	allowPM: true,
	usage: "<text>",
	execute(message, args) {

        const answer = args.join(" ").split("").reverse().join("");
        message.channel.send(answer);

    }
};
