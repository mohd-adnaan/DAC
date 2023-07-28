<?php
include_once("connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Check if the request contains JSON data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Check if JSON data is parsed successfully and contains required fields
    if ($data && isset($data["latitude"]) && isset($data["longitude"])) {
        $latitude = test_input($data["latitude"]);
        $longitude = test_input($data["longitude"]);

        // Store latitude and longitude as an array in the database
        $location_array = array($latitude, $longitude);

        $query = "INSERT INTO LatLong(Coordinate) VALUES ($1)";
        $stmt = pg_prepare($dbconn, "insert_location", $query);
        if ($stmt) {
            $result = pg_execute($dbconn, "insert_location", array($location_array));
            if ($result) {
                echo json_encode(["success" => true, "message" => "Location data saved successfully"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error executing the insert query"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Error preparing the insert query"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid or missing JSON data"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

pg_close($dbconn);
?>
