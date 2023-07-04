<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$user_phoneNumber = test_input($DecodedData['phoneNumber']);
//$user_mobile='9871106478';
	if($user_mobile==10){
	$SQ = "SELECT * from users WHERE mobile=$1";
	$check = pg_query_params($dbconn, $sql, Array($user_mobile));
	
	if ( pg_num_rows($check)>0 )
	{
		$Row = pg_fetch_assoc($check);
		$status="Success";
		$Message = "Successfully logged into account!";
		$id = $Row["id"];
		$name = $Row["name"];
        $phoneNumber = $Row["phoneNumber"];
        $designation = $Row["designation"];
        $department = $Row["department"];
		$address = $Row["address"];
        $country = $Row["country"];
        $state=$Row["state"];
		$city = $Row["city"];
		$pinCode=$Row["pinCode"];
	}
	else
	{	$status="Failed";
		$Message = "No account exists with the phone number '$user_phoneNumber' ";
		$id = 0;
        $name = "";
		$phoneNumber = "";
		$designation = "";
        $department = "";
		$address = "";
        $country = "";
        $state="";
		$city="";
		$pinCode="";
	}
	
	$Response = ["status"=>$status, "Message" => $Message, "id" => $id, "name" => $name, "phoneNumber" => $phoneNumber, "designation" => $designation, "department" =>$department "address" => $address, "country" => $country ,"state"=>$state,, "city"=>$city , "pinCode"=>$pinCode];
	echo json_encode($Response);}
	else{
		$Response = ["status"=>"Failed", "Message" => "Invalid Mobile Number."];
		echo json_encode($Response);
	}

$db_connection->close();
?>