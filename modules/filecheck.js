const fs = require("fs");
module.exports = {

check(path, string) {

	if (fs.existsSync(path)) {
		console.log(`\t\tFound ${path}. Continuing...`);  	
	}
	else {
		console.log(`\t${path} not found. Creating new...`);
		fs.writeFile(path, string, {flag: 'wx'}, err => {
  			if (err) throw err;
  			console.log(`\t${path} created! Continuing...`);
  		});  
	}
}}
