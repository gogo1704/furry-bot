const fs = require("fs");
const filecheck = require("../modules/filecheck.js");

module.exports = {
	name: "activity",
	description: "Sets bot activity!",
	args: true,
	usage: `playing | streaming | listening | watching | competing <activity>`,
  allowPM: true,
  cooldown: 0,
	execute(message, args) {

		let dictionary = {
							"verbs": ["playing", "listening", "watching", "competing"],
							"adjectives": [],
							"nouns": []
						 };

		const path = "./modules/dictionary.json";
		filecheck.check(path, JSON.stringify(dictionary));	// 1st arg: path to file, 2nd arg: default string, if file not found
  	const file = fs.readFileSync(path);
		dictionary = JSON.parse(file);

		switch (args[0].toString().toLowerCase()) {
			case "clear":
				message.client.user.setActivity("");
				break;

			case "set":
				if (subarg) {
					message.client.user.setActivity("");	// this sometimes helps if activity bugs or lags
					message.client.user.setActivity(args.slice(2).join(" "), { type: args[1].toUpperCase() });
				} else {
					message.channel.send("Usage: `'activity set <playing | listening | watching | competing> <activity>`");
				}
				break;

			case "list":
				message.channel.send("This freaking dictionary has 3477 entries! Do you really want me to print it all on this chat?");
			  break;

			case "add":
				switch (subarg) {
					case "adjective":
						dictionary.adjectives.push(args.splice(2).join(" "));
						break;
					case "noun":
						dictionary.nouns.push(args.splice(2).join(" "));
						break;
					default:
						message.channel.send("Usage: `'activity add <adjective | noun>`");
						break;
				}
				break;

			case "random":
				let verb = dictionary.verbs[Math.floor(Math.random() * dictionary.verbs.length)];
				let adjective = dictionary.adjectives[Math.floor(Math.random() * dictionary.adjectives.length)];
				let noun = dictionary.nouns[Math.floor(Math.random() * dictionary.nouns.length)];

				let article = "";
				let vowels = ["a", "e", "i", "o", "u", "y"];
				if (vowels.indexOf(adjective.charAt(0)) !== -1) {
					article = "an";
				} else {
					article = "a";
				}

				let status = article + " " + adjective + " " + noun;

				message.client.user.setActivity("");	// this sometimes helps if activity bugs or lags
				message.client.user.setActivity(status, { type: verb.toUpperCase() });
				break;

			default:
				message.channel.send("Usage: `'activity set <playing | listening | watching | competing> <activity>`");
		};
}

