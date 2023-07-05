<?php
	error_reporting(E_ERROR | E_WARNING | E_PARSE);
    include_once ("connection.php");

	$EncodedData = file_get_contents('php://input');
	$DecodedData = json_decode($EncodedData, true);

	$name=test_input($DecodedData['name']);
	$phoneNumber = test_input($DecodedData['phoneNumber']);
    $designation = test_input($DecodedData['designation']);
    $department = test_input($DecodedData['department']);
    $address = test_input($DecodedData['address']);
    $state = test_input($DecodedData['state']);
    $pinCode = test_input($DecodedData['pinCode']);
	$mob_model=test_input($DecodedData['mob_model']);
	$os_version=test_input($DecodedData['os_version']);
	$code=0;

	if(strlen($phoneNumber)==10 && strlen($name)>1  && strlen($pinCode)==6 ) {

	$SQ = "SELECT * from users WHERE mobile = $1 ";
	$check = pg_query_params($db_connection, $SQ, Array($phoneNumber));
	if ( pg_num_rows($check)>0 )
	{
		$Message = "An account with this phone number already exist!";
		$code=1;
		
	}
	else
	{
		$IQ = "INSERT INTO users (name, phoneNumber, designation, department , address, state , pinCode , mob_model , os_version ,id) VALUES ('$name', '$phoneNumber', '$designation', '$department' , '$address', '$state', '$pinCode','$mob_model','$os_version','')";

		$result = pg_query($db_connection, $IQ);
//echo $IQ;
		if($result)
		{
			$Message = "Successfully Registered!";
			$code=3;
			//$row = mysqli_fetch_row($result);
			
		}
		else
		{
			$Message = "Server Error...Please try later";
			$code=2;
		}
	}
}
else	{$Message="Missing parameters";
		 $code=4;
		}
	
	$Response = ["Message" => $Message,"Code"=>$code];
	echo json_encode($Response);

	pg_close($dbconn);
?>