const iconfontMaker = require("iconfont-maker");
const FS = require("fs");
const Path = require("path");
const args = process.argv.slice(2);


iconfontMaker({
	fontName: "icon",
	files: [
		`${ args[0] }**/*.svg`
	],
	dest: args[1],

	css: true,
	cssDest: args[1] + "index.scss",
	cssTemplate: Path.resolve(process.cwd(), "src/node/templates/scss.hbs"),
	cssFontsUrl: "#{ $icon-font-base-path }",

	html: true,
	htmlDest: args[1] + "index.html",
	htmlTemplate: Path.resolve(process.cwd(), "src/node/templates/html.hbs"),
}, function (error) {
	if (error) {
		console.error(error);
		throw error;
	}
});