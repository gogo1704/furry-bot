const fs = require("fs");
const filecheck = require("../modules/filecheck.js");

module.exports = {

	name: "activity",
	description: "Sets bot activity!",
	args: true,
	usage: "<set | random | list | add | clear>",
    allowPM: true,
    cooldown: 0,
	execute(message, args) {

		// verb = czasownik
		// adjective = przymiotnik
		// noun = rzeczownik

		let dictionary = {	
							"verbs": ["playing", "listening", "watching", "competing"], 
							"adjectives": [], 
							"nouns": [] 
						 };

		const path = "./local/activities.json";
		// 1st arg: path to file, 2nd arg: if file not found, default string		
		filecheck.check(path, JSON.stringify(dictionary));					
  		const file = fs.readFileSync(path);
		dictionary = JSON.parse(file);

		let subarg = "";
		if (args[1]) { subarg = args[1].toString().toLowerCase() }
		
		switch (args[0].toString().toLowerCase()) {
			case "clear":
				message.client.user.setActivity("");
				break;
			case "set":
				if (subarg) {
					// This sometimes helps if activity bugs or lags. It deletes activity on restarting bot, but not on reload
					message.client.user.setActivity("");					
					message.client.user.setActivity(args.slice(2).join(" "), { type: args[1].toUpperCase() });
				} else {
					message.channel.send("Usage: `'activity set <playing | listening | watching | competing> <activity>`");
				}
				break;
			case "list":
				const embed = new Discord.MessageEmbed()
			     .setColor('#ff425f')
			     .setTitle('Dictionary')
                 .setDescription('AAAAA')
			     .addField('Huj', true)
                 .addField('Huje', true)
			     .addField('Huhihi', true)
                 .setTimestamp()
			     message.channel.send(embed);
				/* switch (subarg) {
					case "verbs":
						message.channel.send(dictionary.verbs.join(", "));
						break;
					case "adjectives":
						message.channel.send(dictionary.adjectives.join(", ")); 
						break;
					case "nouns":
						message.channel.send(dictionary.nouns.join(", "));
						break;
					default:
						message.channel.send("Usage: `'activity list <verbs | adjectives | nouns>`");
						break;
					} */
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
				let status = adjective + " " + noun;


				// This sometimes helps if activity bugs or lags. It deletes activity on restarting bot, but not on reload
				message.client.user.setActivity("");					
				message.client.user.setActivity(status, { type: verb.toUpperCase() });
				break;
			default:
				message.channel.send("Usage: `'activity <set | random | list | add | clear>`");
		}
		
	}
};
