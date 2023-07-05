<?php
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$user_phoneNumber = test_input($DecodedData['phoneNumber']);
	if(strlen($user_phoneNumber)==10){
	$SQ = "SELECT * from users WHERE phone=$1";
	$check = pg_query_params($dbconn, $SQ, Array($user_phoneNumber));
	
	if ( pg_num_rows($check)>0 )
	{
		$Row = pg_fetch_assoc($check);
		$status="Success";
		$Message = "Successfully logged into account!";
		$id = $Row["id"];
		$name = $Row["name"];
        $phoneNumber = $Row["phone"];
        $designation = $Row["designation"];
        $department = $Row["department"];
		$address = $Row["address"];
        $state=$Row["state"];
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
        $state="";
		$pinCode="";
	}
	
	$Response = ["status"=>$status, "Message" => $Message, "id" => $id, "name" => $name, "phoneNumber" => $phoneNumber, "designation" => $designation, "department" =>$department, "address" => $address ,"state"=>$state , "pinCode"=>$pinCode];
	echo json_encode($Response);}
	else{
		$Response = ["status"=>"Failed", "Message" => "Invalid Phone Number."];
		echo json_encode($Response);
	}

	pg_close($dbconn);
?>