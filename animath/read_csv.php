<?php

$_ENV = parse_ini_file(".env");//ouch

//echo $_ENV['SECRET'];

// Specify the path to your CSV file
$csvFile = '__AIME_Dataset_1983_2024.csv';

// Open the file in read mode
if (($handle = fopen($csvFile, 'r')) !== FALSE) {

    // Read the first line for the headers
    $headers = fgetcsv($handle, 1000, ',');

    // Initialize an empty array to hold the data
    $data = [];

    // Loop through the remaining rows in the file
    while (($row = fgetcsv($handle, 3000, ',')) !== FALSE) {
        // Combine the headers with the row values to create an associative array
        $data[] = array_combine($headers, $row);
    }

    // Close the file
    fclose($handle);

    // Output or use the associative array
    print_r($data);
} else {
    echo "Failed to open the file.";
}
