module.exports = {
	name: "args-debug",
	description: 'Information about the arguments provided. (Used for debugging)',
	args: true,
	usage: "<argument> [...]",
    allowPM: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		
		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	}
};
