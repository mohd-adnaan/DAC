<?php
include_once("connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $latitude = test_input($_POST["latitude"]);
    $longitude = test_input($_POST["longitude"]);

    $query = "INSERT INTO location_table(latitude, longitude) VALUES ($1, $2)";
    $stmt = pg_prepare($dbconn, "insert_location", $query);
    $result = pg_execute($dbconn, "insert_location", array($latitude, $longitude));

    if ($result) {
        echo json_encode(["success" => true, "message" => "Location data saved successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error saving location data"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

pg_close($dbconn);
?>
