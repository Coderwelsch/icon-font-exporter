const iconfontMaker = require("iconfont-maker");
const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

const SCSS_TEMPLATE_PATH = path.join(__dirname, "../node/templates/scss.hbs");
const HTML_TEMPLATE_PATH = path.join(__dirname, "../node/templates/html.hbs");


iconfontMaker({
	fontName: "icon",
	files: [
		`${ args[0] }**/*.svg`,
	],
	dest: args[1],

	css: true,
	cssDest: args[1] + "index.scss",
	cssTemplate: SCSS_TEMPLATE_PATH,
	cssFontsUrl: "#{ $icon-font-base-path }",

	html: true,
	htmlDest: args[1] + "index.html",
	htmlTemplate: HTML_TEMPLATE_PATH,
}, function (error) {
	if (error) {
		console.log(error);
		process.exit(1);
	}

	process.exit(0);
});