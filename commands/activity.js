module.exports = {

	name: "activity",
	description: "Sets bot activity!",
	args: true,
	usage: `"playing | streaming | listening | watching | competing" "string"`,
    allowPM: true,
    
	execute(message, args) {

		message.client.user.setActivity("");			// This sometimes helps if activity bugs or lags. It deletes activity on restarting bot, but not on reload
		message.client.user.setActivity(args.slice(1).join(" "), { type: args[0].toUpperCase() });
		
	}
};
