const fs = require("fs");

// We do this instead of require() now!
const filecheck = require ("../modules/filecheck.js");

module.exports = {
	name: "write",
	description: "Write-only notepad that allows to save stuff for later.",
	usage: "[sentence]",
	cooldown: 10,
	execute(message, args) {
		const path = './local/guestbook.json';		
		filecheck.check(path, '[]');			// 1st arg: path to file, 2nd arg: if file not found, default string
  		const file = fs.readFileSync(path);
		let parsedFile = JSON.parse(file);

		if (!args.length) {
			let doc = "";
			for (const note of parsedFile) {
				doc += note + "\n";
			}
			message.channel.send(doc, { split: true } );
		} else {
			let line = "";
			for (const arg of args) {
				line += arg+" ";
			}

			parsedFile.push(line);
			try {
				fs.writeFileSync(path, JSON.stringify(parsedFile));
			} catch(error) {
				console.error(error);
			}

		}
	}
};
