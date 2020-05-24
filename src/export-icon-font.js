import Path from "path";
import { exec } from "@skpm/child_process";
import FileSystem from "@skpm/fs";


export default async (inputDir, outputDir) => {
	const cwd = Path.resolve(process.cwd(), "Contents/Resources/");
	const scriptPath = Path.resolve(cwd, "node/export-icon-font.js")

	console.log("PATH", scriptPath);

	await new Promise((resolve, reject) => {
		exec(`node '${ scriptPath }' '${ inputDir }' '${ outputDir }'`, (error, output, stderr) => {
			if (error) {
				console.error(error);
				reject(error);
			} else {
				resolve();
			}
		});
	});
};