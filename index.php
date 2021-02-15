<?php

//ini_set('memory_limit','1343M');

/* Read and process binary containing world layer data */

$worldIDMap = fopen("XXX", "rb"); // Change 'XXX' to path of binary ID map file.
$filesize = filesize("XXX"); // Change 'XXX' to path of binary ID map file.

if (FALSE === $worldIDMap) {
    exit("Could not load world map!");
}

$content = [];

while (!feof($worldIDMap)) {
	$readValues = unpack("C*", fread($worldIDMap, sqrt($filesize)));

	// Re-index rows (prepare for json encoding).
    $content[] = array_values($readValues);
}

echo '
	<html>
	<head>
		<style>
			html, body, div, canvas {
			    margin: 0;
			    padding: 0;
			}
		</style>

		<script>
			let worldMap = '.json_encode($content).';
		</script>

		<script src="./js/camera.js" charset="utf-8"></script>
		<script src="./js/tile_map.js" charset="utf-8"></script>
		<script src="./js/player.js" charset="utf-8"></script>
		<script src="./js/sprite.js" charset="utf-8"></script>
		<script src="./js/main.js" charset="utf-8"></script>
	</head>
	<body>
	  <canvas id="canvas"></canvas>
	</body>
';

fclose($worldIDMap);