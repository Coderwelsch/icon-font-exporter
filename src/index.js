import sketch from "sketch";
import Dialog from "@skpm/dialog";
import OS from "os";

import loadConfig from "./load-config";
import exportSketchAssets from "./export-sketch-assets";
import exportIconFont from "./export-icon-font";


const TEMP_FILES_DIR_NAME = "temp";

let currentSteps = 0;
const totalSteps = 3;

function getOutputDir () {
	let dir = openDialog({ message: "Please choose icon font export directory …" });

	if (!dir) {
		sketch.UI.message("Canceled icon export");
		throw "Canceled";
	}

	return dir[0].replace("~", OS.homedir());
}

export default async () => {
	const doc = sketch.getSelectedDocument();

	if (doc) {
		// load config
		const config = loadConfig("icon-font-exporter");

		const pageToExport = config.pageName ?
				doc.pages.filter(({ name }) => name !== config.pageName)[0] :
				doc.selectedPage;

		const artboardsToExport = pageToExport.layers;

		// opens file dialog when output isn’t set
		let output = config.output || getOutputDir();

		// add a slash to the configs output path, when not defined
		if (!output.endsWith("/")) {
			output += "/";
		}

		let svgOutput = `${ output }${ TEMP_FILES_DIR_NAME }/`;

		await exportSketchAssets(svgOutput);
		stepDone(`Exported ${ artboardsToExport.length } svg icon assets successfully`);

		try {
			await exportIconFont(svgOutput, output);
			stepDone(`Exported icon font to «${ config.output }» successfully`);
		} catch (error) {
			console.error(error);
			sketch.UI.message("Error occured while exporting icon font");
		}


	} else {
		console.log("Error: No document selected");
	}
}

function openDialog (settings) {
	const doc = sketch.getSelectedDocument();

	return Dialog.showOpenDialogSync({
		properties: ["openDirectory"],
		showHiddenFiles: true,
		createDirectory: true,
		defaultPath: doc.path,
		...settings
	});
}

function stepDone (message) {
	currentSteps++;
	sketch.UI.message(`💠 [${ currentSteps }/${ totalSteps }] ${ message }`);
}