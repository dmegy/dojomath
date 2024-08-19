<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

$logFilePath = 'backups/backup_log.txt'; 
$backupFilePath = 'backups/last_backup_time.txt';
$backupDirectory = 'backups/';    


$filesToBackup = [
    'databases/db_main.sqlite3',
    'databases/db_questions.sqlite3',
    'databases/db_questions_feedback.sqlite3',
    'databases/db_messages.sqlite3'
];



function isOneDayOld($timestamp) {
    $oneDayAgo = time() - 86400; // 86400 seconds = 24 hours
    return $timestamp < $oneDayAgo;
}

// Function to log messages to backup_log.txt
function logMessage($message, $logFilePath) {
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFilePath, "[$timestamp] $message\n", FILE_APPEND);
}

$lastBackupTime = file_exists($backupFilePath) ? trim(file_get_contents($backupFilePath)) : 0;
if (!is_numeric($lastBackupTime)) {
    $lastBackupTime = 0;  
}

$lastBackupTime = (int)$lastBackupTime;

if (isOneDayOld($lastBackupTime)) {
    $allBackupsSuccessful = true;  
    
    $currentDate = date('Y-m-d_H-i-s');

    foreach ($filesToBackup as $databasePath) {

        // Generate the backup file name (e.g., backups/myfile_backup_2024-08-19_12-34-56.sqlite3)
        $backupFileName = $backupDirectory . basename($databasePath, '.sqlite3') . '_backup_' . $currentDate . '.sqlite3';



        if (copy($databasePath, $backupFileName)) {
            logMessage("Success: Backup of $databasePath to $backupFileName", $logFilePath);
        } else {
            logMessage("Error: File $databasePath could not be saved", $logFilePath);
            $allBackupsSuccessful = false;
        }
    }

    if ($allBackupsSuccessful) {
        file_put_contents($backupFilePath, time());
        logMessage("All backups successful. Timestamp updated in $backupFilePath.", $logFilePath);
    } else {
        logMessage("At least one backup failed. Timestamp not updated.", $logFilePath);
    }
} else {
    //logMessage("No backup needed. Last backup was less than a day ago.", $logFilePath);
    // va être appelé à chaque quiz terminé, ne pas polluer les logs
}
?>