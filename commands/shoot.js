const fs = require("fs");
const filecheck = require("../modules/filecheck.js");

module.exports = {
    name: "shoot",
    description: "Shoot a targeted user.",
    args: true,
    cooldown: 60,
    usage: "<@user>",
    execute(message, args) {
    	const path = './local/hp.json';		
		// We do this instead of require() now!
        filecheck.check(path, '{}');			// 1st arg: path to file, 2nd arg: if file not found, default string
        const file = fs.readFileSync(path);
		const parsedFile = JSON.parse(file);
        const user = message.mentions.users.first();
        if (user) {
            if (message.guild.member(user)) {
				if(parsedFile[user.id]){
					parsedFile[user.id]--;
					// w razie czego zapierdolcie to stad 
				} else {
					parsedFile[user.id] = 99;	
				}
			message.channel.send(`You shot ${user} and they have ${parsedFile[user.id]}/100HP!`);
				try {
					fs.writeFileSync(path, JSON.stringify(parsedFile));
				} catch(error) {
					console.error(error);
				}
            }
        } else {
          message.channel.send("Who do you want to kill?");
        }
    }
};
