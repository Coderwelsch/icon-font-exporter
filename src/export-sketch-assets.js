import sketch from "sketch";


function exportSketchAssets (output) {
	const doc = sketch.getSelectedDocument();
	const page = doc.selectedPage;
	const artboards = page.layers;

	sketch.export(
		artboards,
		{
			output: output,
			formats: "svg",
			overwriting: true
		}
	);
}

export default exportSketchAssets;


