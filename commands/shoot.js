const fs = require("fs");

// We do this instead of require() now!
const filecheck = require ("../modules/filecheck.js");

let path = '../local/hp.json';
filecheck.check(path, '{}');			// 1st arg: path to file, 2nd arg: if file not found, default string

let log;
fs.readFile(path, (err, data) => {
	if(err)
		throw err;
	log = JSON.parse(data);				// Read JSON file		

});

module.exports = {
    name: "shoot",
    description: "Shoot a targeted user.",
    args: true,
    usage: "<@user>",
    execute(message, args) {
        const user = message.mentions.users.first();
        if (user) {
            if (message.guild.member(user)) {
				message.channel.send(`You've shot ${user}`);
				if(log[user.id]){
					log[user.id]--;
					// w razie czego zapierdolcie to stad 
				} else {
					log[user.id] = 99;	
				}
			message.channel.send(`and he has ${log[user.id]}/100HP!`);
				try {
					fs.writeFileSync(path, JSON.stringify(log));
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
