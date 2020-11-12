let log = require("../local/hp.json");
const fs = require("fs");
module.exports = {
    name: "shoot",
    description: "Shoot a targeted user.",
    args: true,
    usage: "<user>",
    execute(message, args) {
        const user = message.mentions.users.first();
        if (user) {
            if (message.guild.member(user)) {
				message.channel.send(`You've shot ${user}`);
				if(log[user.id]){
					log[user.id]--;
					// w razie czego zapierdolcie to stąd 
				} else {
					log[user.id] = 99;	
				}
			message.channel.send(`and he has ${log[user.id]}/100HP!`);
				try {
					fs.writeFileSync("./local/hp.json", JSON.stringify(log));
				} catch(error) {
					console.error(error);
				}
            }
                if (message.guild.member(user)) {
                        message.channel.send(`You've shot ${user}!`);
                }
        } else {
          message.channel.send("Who do you want to kill?");
        }
    }
};
