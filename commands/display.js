module.exports = {

	name: "display",
	description: "Displays variable without editing code! (Used for debugging)",
	args: true,
	usage: `var`,
    allowPM: true,
    
	execute(message, args) {

		eval(`message.channel.send(${args.join(" ")})`);
		
	}
};
