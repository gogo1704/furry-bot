const Discord = require("discord.js");
const fs = require("fs");
const filecheck = require("../modules/filecheck.js");

module.exports = {
	name: "activity",
	description: "Sets bot activity!",
	args: true,
	usage: {	color: "#FF425F", 
				title: "Command: activity", 
				description: "Description: Sets bot activity\nUsage: `activity <argument>`\nArguments:`", 
				fields: 
					[{ name: "`clear`", value: "Clears set status" }, 
					{ name: "`set <verb> <activity>`", value: "Sets new status\nVerbs: `playing | listening | watching | competing`" },
					{ name: "`list <dictionary>`", value: "Lists dictionaries\nDictionaries: `verbs | adjectives | nouns`" },
					{ name: "`add <dictionary> <word>`", value: "Adds word to dictionary\nDictionaries: `verbs | adjectives | nouns`" },
					{ name: "`random`", value: "Randomizes status from dictionaries" }] },
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

		if (args[0]) {

			let subarg = "";
			if (args[1]) { subarg = args[1].toString().toLowerCase() };
			
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
					let embed = {color: "#ff425f", title: "lalala2", description: "desc", fields: [{name: "Field", value: "dadada2", inline: true}, {name: "Field22", value: "dadada22", inline: true}]};
					/*let embed = new Discord.MessageEmbed()
						.setColor('#ff425f')
						.setTitle('Dictionary')
						.setDescription('AAAAA')
						.addField('Huj', true)
						.addField('Huje', true)
						.addField('Huhihi', true)
						.setTimestamp();*/
					//embed = 
					message.channel.send(new Discord.MessageEmbed(embed));
					//console.log(embed);
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
					message.channel.send(new Discord.MessageEmbed(module.exports.usage));
			};
		};
	}
};
