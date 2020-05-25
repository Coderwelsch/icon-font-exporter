import Path from "path";
import { exec } from "@skpm/child_process";


export default async (inputDir, outputDir) => {
	const cwd = Path.resolve(process.cwd(), "Contents/Resources/");
	const scriptPath = Path.resolve(cwd, "node/export-icon-font")

	await new Promise((resolve, reject) => {
		exec(`'${ scriptPath }' '${ inputDir }' '${ outputDir }'`, (error, output, stderr) => {
			if (error) {
				console.error(error);
				reject(error);
			} else {
				resolve();
			}
		});
	});
};