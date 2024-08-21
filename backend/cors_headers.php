<?php

$allowed_origins = [
    'http://www.dojomath.fr',
    'https://www.dojomath.fr',
    'http://dojomath.fr',
    'https://dojomath.fr'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';


if (!in_array($origin, $allowed_origins)) {
    header("HTTP/1.1 403 Forbidden");
    echo "Access denied.";
    exit;
}


header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); 
}

header("Content-Type: application/json");
