import FileSystem from "@skpm/fs";
import Path from "path";
import sketch from "sketch";


const loadConfig = (pluginIdentifier = null) => {
	const doc = sketch.getSelectedDocument();
	const path = decodeURIComponent(`${ Path.dirname(doc.path) }/.sketchconfig.json`);

	if (FileSystem.existsSync(path)) {
		try {
			const config = JSON.parse(
				FileSystem.readFileSync(path, "utf8")
			);

			// try to get config by plugin identifier
			if (pluginIdentifier) {
				return config && config.plugins && config.plugins[pluginIdentifier];
			}

			// returns the whole config
			return config;
		} catch (error) {
			console.log(error);
		}
	}

	console.log(`Info: Config file does not exists under «${ Path.dirname(path).split(Path.sep).pop() }/.sketch.json»`);
	return null;
}

export default loadConfig;