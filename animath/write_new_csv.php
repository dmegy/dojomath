<?php
$inputCsvFile = '__AIME_Dataset_1983_2024_without_asy.csv';
$outputCsvFile = '__AIME_Dataset_1983_2024_without_asy_new.csv';


$inputHandle = fopen($inputCsvFile, 'r');
if ($inputHandle === FALSE) {
    echo "Failed to open the input file.";
    return;
}

$outputHandle = fopen($outputCsvFile, 'w');
if ($outputHandle === FALSE) {
    echo "Failed to open the output file.";
    fclose($inputHandle); // Close the input file if output file couldn't be opened
    return;
}

// Read the first line for the headers of the input file
$headers = fgetcsv($inputHandle, 1000, ',');
if ($headers === FALSE) {
    echo "Failed to read headers from the input file.";
    fclose($inputHandle);
    fclose($outputHandle);
    return;
}

// Write the new headers to the output file
$newHeaders = ['competition', 'Year', 'Problem Number', 'Question', 'Answer'];
fputcsv($outputHandle, $newHeaders);

// Process each row and write to the output file
while (($row = fgetcsv($inputHandle, 3000, ',')) !== FALSE) {
    // Combine headers with row values to create an associative array
    $rowAssoc = array_combine($headers, $row);

    // Create the new 'competition' field
    $competition = 'AIME';

    if($rowAssoc['Part']) $competition .= "-" . $rowAssoc['Part'];

    // Write the new row to the output file
    fputcsv($outputHandle, [
        $competition,
        $rowAssoc['Year'],
        $rowAssoc['Problem Number'],
        $rowAssoc['Question'],
        $rowAssoc['Answer']
    ]);
}

// Close both files
fclose($inputHandle);
fclose($outputHandle);

echo "success";
