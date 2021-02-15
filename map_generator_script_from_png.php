<?php

/**************************************************************************
 *** Execute this script to generate world binary map from a png image
 *** based on its pixel color code (256 IDs allowed).
***************************************************************************/

// Set correspondency between pixel color code (decimal base) and world element type.
define("WATER_COLOR_INDEX", 10410486);
define("LAND_GRASS_COLOR_INDEX", 0);

// Prepare image.
$src = $argv[1];

$img = imagecreatefrompng($src);   
$size = getimagesize($src);
$img_width  = $size[0];
$img_height = $size[1];

$bin_data = '';
$file_w = fopen('world', 'w+');

for ($x=0; $x<$img_width; $x++) {
	for ($y=0; $y<$img_height; $y++) {
        $rgb = imagecolorat($img, $x, $y);

        $id = getId($rgb); // ID for base element category.

        $bin_data .= pack("C", $id);
    }

}

fwrite($file_w, $bin_data);
fclose($file_w);

function getId($rgb) {
    // Set IDs for items in world layer. Pack integers as 8 bit for a better management of memory since we won't be using IDs higher than 255.
    if ($rgb === WATER_COLOR_INDEX) {
        $id = 0;
    } else if ($rgb === LAND_GRASS_INDEX) {
        $id = 1;
    } else {
        $id = -1;
    }

    return $id;
}