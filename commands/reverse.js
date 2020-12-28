module.exports = {
	name: "reverse",
	description: "Reverse a sentence.",
	allowPM: true,
	args: true,
	usage: "<text>",
	execute(message, args) {

        const answer = args.join(" ").split("").reverse().join("");
        message.channel.send(answer);

    }
};
