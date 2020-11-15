const fs = require("fs");

// We do this instead of require() now!
const filecheck = require ("../modules/filecheck.js");


module.exports = {
    name: "shoot",
    description: "Shoot a targeted user.",
    args: true,
    usage: "<@user>",
    execute(message, args) {
    	const path = './local/hp.json';		
		filecheck.check(path, '{}');			// 1st arg: path to file, 2nd arg: if file not found, default string
  		const file = fs.readFileSync(path);
		const parsedFile = JSON.parse(file);
        const user = message.mentions.users.first();
        if (user) {
            if (message.guild.member(user)) {
				message.channel.send(`You've shot ${user}`);
				if(parsedFile[user.id]){
					parsedFile[user.id]--;
					// w razie czego zapierdolcie to stad 
				} else {
					parsedFile[user.id] = 99;	
				}
			message.channel.send(`and he has ${parsedFile[user.id]}/100HP!`);
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
