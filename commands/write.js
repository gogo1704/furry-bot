const fs = require("fs");

// We do this instead of require() now!
const filecheck = require ("../modules/filecheck.js");

let path = './local/guestbook.json';
filecheck.check(path, '[]');			// 1st arg: path to file, 2nd arg: if file not found, default string

let log;
fs.readFile(path, (err, data) => {
	if(err)
		throw err;
	log = JSON.parse(data); 			// Read JSON file
 
});

module.exports = {
	name: "write",
	description: "Write-only notepad that allows to save stuff for later.",
	usage: "[sentence]",
	execute(message, args) {
		if (!args.length) {
			let doc = "";
			for (const note of log) {
				doc += note + "\n";
			}
			message.channel.send(doc, { split: true } );
		} else {
			let line = "";
			for (const arg of args) {
				line += arg+" ";
			}
			log.push(line);
			try {
				fs.writeFileSync(path, JSON.stringify(log));
			} catch(error) {
				console.error(error);
			}
			

		}
	}
};
