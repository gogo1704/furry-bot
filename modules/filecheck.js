const fs = require("fs");
module.exports = {

check(path, string) {

	if (fs.existsSync(path)) {
		return true;
	}
	else {
		fs.writeFileSync(path, string, {flag: 'wx'});  
	}
}}
