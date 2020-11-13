const fs = require("fs");
module.exports = {

check(path, string) {

	if (fs.existsSync(path)) {
		return true;
	}
	else {
		fs.writeFile(path, string, {flag: 'wx'}, err => {
  			if (err) throw err;
  			return true;
  		});  
	}
}}
