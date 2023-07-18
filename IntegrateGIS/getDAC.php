<?php

include_once("connection.php");


function test_input($data) {
    // Implement your custom sanitization logic here if needed
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $latitude = test_input($_POST["latitude"]);
    $longitude = test_input($_POST["longitude"]);


    $query = "SELECT ST_AsGeoJSON(geom) FROM jamalpur_dac WHERE ST_Within(ST_SetSRID(ST_MakePoint($1, $2), 4326), geom)";
    $stmt = pg_prepare($dbconn, "fetch_dac_data", $query);
    $result = pg_execute($dbconn, "fetch_dac_data", array($longitude, $latitude));

    
    if ($result) {
        // Fetch all the rows returned by the query
        $dacData = array();
        while ($row = pg_fetch_assoc($result)) {
            $dacData[] = $row;
        }

        echo json_encode(["success" => true, "data" => $dacData]);
    } else {
    
        echo json_encode(["success" => false, "message" => "Error fetching DAC data"]);
    }
} else {

    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

pg_close($dbconn);
?>
