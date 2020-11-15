const fs = require("fs");
const filecheck = require ("../modules/filecheck.js");


module.exports = {
    name: "heal",
    description: "Heal a targeted user.",
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
				message.channel.send(`You healed ${user}`);
				if(parsedFile[user.id] && parsedFile[user.id]<99){
					parsedFile[user.id]++;
                    message.channel.send(`and he has ${parsedFile[user.id]}/100HP!`);
				} else {
					message.channel.send(`${user} has max HP!`);
				}
				try {
					fs.writeFileSync(path, JSON.stringify(parsedFile));
				} catch(error) {
					console.error(error);
				}
            }
        } else {
          message.channel.send("Who do you want to heal?");
        }
    }
};
