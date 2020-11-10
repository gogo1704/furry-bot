const { prefix } = require("../local/config.json");
module.exports = {
	name: "roll",
	description: `Rolls the dice. Ex. \`${prefix}roll 2d6\``,
	args: true,
	usage: "<number>|<dice>d<sides>",
	execute(message, args) {
		if (!isNaN(args[0])) {
			return message.channel.send(Math.floor((Math.random() * args[0]) + 1));
		} else if (/^d\d+$/.test(args[0])) {
			return message.channel.send(Math.floor((Math.random() * args[0].substring(1) + 1)));
		} else if (/^\d+d\d+$/.test(args[0])) {
			const dice = parseInt(args[0].split("d")[0]);
			const sides = parseInt(args[0].split("d")[1]);
			const rolls =[];
			for (let i = 0; i < dice; i++) {
				rolls.push(Math.floor((Math.random() * sides) + 1));
			}
			return message.channel.send(rolls.reduce((a, b) => {return a + b;}));
		} else {
			let reply = "Invalid arguments!";
			if (this.usage) {
				reply += `\nUsage: \`${prefix}${this.name} ${this.usage}\``;
			}
			return message.channel.send(reply);
		}
		
	}
};