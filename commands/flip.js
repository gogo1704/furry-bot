module.exports = {
	name: "flip",
	description: "Flips the coin.",
    	allowPM: true,
	execute(message, args) {
		const side = Math.floor(Math.random() * 2)===0 ? "heads" : "tails";
		message.channel.send(`You flipped a coin. It landed on ${side}!`);
	}
};
