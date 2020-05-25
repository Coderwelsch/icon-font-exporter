const iconfontMaker = require("iconfont-maker");

const args = process.argv.slice(2);


iconfontMaker({
	files: [
		`${ args[0] }**/*.svg`
	],
	dest: args[1],
	fontName: "icon",
	html: true,
	css: true,
	cssDest: args[1] + "styles.css",
	htmlDest: args[1] + "index.html"
}, function (error) {
	if (error) {
		throw error;
	}
});