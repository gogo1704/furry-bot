let log = require("../guestbook.json");
const fs = require("fs");
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
				fs.writeFileSync("../guestbook.json", JSON.stringify(log));
			} catch(error) {
				console.error(error);
			}
			

		}
	},
};