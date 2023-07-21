// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Alert, TextInput ,ActivityIndicator} from 'react-native';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import DeviceInfo from 'react-native-device-info';
// import NetInfo from "@react-native-community/netinfo";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import * as Animatable from 'react-native-animatable';
// import '../global.js'
// import { Platform } from 'react-native';

// const SignUpScreen = () => {
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [department, setDepartment] = useState('');
//   const [address, setAddress] = useState('');
//   const [state, setState] = useState('');
//   const [pin, setPinCode] = useState('');
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false)
//   const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
//   //let url = global.server_url + "register.php";
//   const [IsOffline, setIsOffline] = useState(false)


//   const nameRegex = /^[A-Za-z\s]{3,25}$/;
//   const phoneNumberRegex = /^[0-9]{10}$/;
//   const designationRegex = /^[\w\s,/&-]{3,50}$/;
//   const departmentRegex = /^[\w\s,/&-]{3,100}$/;
//   const addressRegex = /^[\w\s,/&-]*$/;
//   const stateRegex = /^[\w\s,/&-]{3,50}$/;
//   const pinRegex = /^[0-9]{6}$/;
//   useEffect(() => {
//     const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
//       const offline = !(state.isConnected && state.isInternetReachable);
//       console.log("offline:", offline)
//       setIsOffline(offline);
//     });


//     return () => removeNetInfoSubscription();
//   }, []);

//   let brand = DeviceInfo.getBrand();
//   let model = brand + " " + DeviceInfo.getModel()
//   let os = Platform.OS
//   let systemVersion = os + " " + DeviceInfo.getSystemVersion();
//   console.log("model", systemVersion)

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: name,
//       phoneNumber: phoneNumber,
//       designation: designation,
//       department: department,
//       address: address,
//       state: state,
//       pinCode: pin,
//       mob_model: model,
//       os_version: os,
//     })
//   };


//   const register = async () => {
//     try {
//       fetch("http://192.168.43.22/Integrate/register.php", requestOptions, 100)
//         .then((response) => response.json())
//         .then(response => {
//           console.log("Message: ", response.Message);
//           if (response.Code == 3) {
//             setIsLoading(false);
//             registerSuccess();
//           } else {
//             alert(response.Message);
//             setIsLoading(false);
//             setName('');
//             setPhoneNumber('');
//             setDesignation('');
//             setDepartment('');
//             setAddress('');
//             setState('');
//             setPinCode('');
//           }
//         })
//         .catch((error) => {
//           Alert.alert("Some Error Occurred!");
//           console.log(error)
//           setIsLoading(false);
//           setName('');
//           setPhoneNumber('');
//           setDesignation('');
//           setDepartment('');
//           setAddress('');
//           setState('');
//           setPinCode('');
//         });
//     } catch (error) {
//       Alert.alert("Some Error Occurred!");
//       console.log(error)
//       setIsLoading(false);
//       setName('');
//       setPhoneNumber('');
//       setDesignation('');
//       setDepartment('');
//       setAddress('');
//       setState('');
//       setPinCode('');
//     }
//   }

//   const registerSuccess = () => {
//     setIsRegisterSuccess(true);

//     setTimeout(() => {
//       setIsRegisterSuccess(false);
//       navigation.navigate("SignIn");
//       setName('');
//       setPhoneNumber('');
//       setDesignation('');
//       setDepartment('');
//       setAddress('');
//       setState('');
//       setPinCode('');
//     }, 3000);
//   }


//   const onSignInPress = () => {
//     navigation.navigate('SignIn');
//   };

//   const onTermsOfUsePressed = () => {
//     navigation.navigate('Terms_Privacy');
//   };

//   const onPrivacyPressed = () => {
//     navigation.navigate('Terms_Privacy');
//   };

//   const validateName = () => {
//     const nameRegex = /^[A-Za-z0-9\s]{3,25}$/;
//     return nameRegex.test(name);
//   };

//   const validatePhoneNumber = () => {
//     // const phoneRegex = /^[0-9]{10}$/;
//     const phoneRegex = /^[0-9]{0,10}$/;
//     return phoneRegex.test(phoneNumber);
//   };

//   const validateDesignation = () => {
//     const designationRegex =/^[\w\s,/&-]{3,50}$/;
//     return designationRegex.test(designation);
//   };

//   const validateDepartment = () => {
//     const departmentRegex =/^[\w\s,/&-]{3,100}$/;
//     return departmentRegex.test(department);
//   };

//   const validateAddress = () => {
//     return address.trim().length > 0;
//   };

//   const validatePin = () => {
//     const pinRegex = /^[0-9]{6}$/;
//     return pinRegex.test(pin);
//   };

//   const validateState = () => {
//     const stateRegex = /^[\w\s,/&-]{3,50}$/;
//     return stateRegex.test(state) && state.length > 0;
//   };

//   const onRegisterPressed = () => {
//     if (!validateName()) {
//       Alert.alert('Invalid Name', 'Name should contain only alphabets with a length between 3 and 25.');
//       return;
//     }

//     if (!validatePhoneNumber()) {
//       Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
//       return;
//     }

//     if (!validateDesignation()) {
//       Alert.alert('Invalid Designation', 'Designation should contain only alphabets with a length between 3 and 50.');
//       return;
//     }

//     if (!validateDepartment()) {
//       Alert.alert('Invalid Department', 'Department should contain only alphabets with a length between 3 and 75.');
//       return;
//     }

//     if (!validateAddress()) {
//       Alert.alert('Invalid Address', 'Address should not be empty.');
//       return;
//     }

//     if (!validatePin()) {
//       Alert.alert('Invalid PinCode', 'PinCode should contain only 6 digits.');
//       return;
//     }

//     if (!validateState()) {
//       Alert.alert('Invalid State', 'State should not be empty.');
//       return;
//     }

//     if(!IsOffline){
//      setIsLoading(true)
//      register()
//     console.warn('Registration Successful');
//     //navigation.navigate('Parent');
//     navigation.navigate('SignIn');

//     }
//       else{
//         Alert.alert("No internet connection")}
//   };

//   return (


//     isRegisterSuccess ? <Animatable.View animation="bounceIn" style={{ backgroundColor: '#4285F4', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
//       <Ionicons style={{ alignSelf: 'center' }}
//         name='checkmark-circle-outline'
//         type='evilicon'
//         color='#ffffff'
//         size={100}
//       />
//       <Text style={{ color: '#ffffff', alignSelf: 'center', fontSize: 22 }}>Registration Success</Text>
//     </Animatable.View> :
//       isLoading ?
//         <View style={{ backgroundColor: 'transparent', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
//           <ActivityIndicator size={70} color="#4285F4" style={{ alignSelf: 'center' }} />
//         </View> :
//         <Animatable.View animation="fadeInUp" style={styles.container}>
//           <LinearGradient colors={['#E4EAF7', '#ffffff']} style={styles.linearGradient}>

//             <ScrollView showsVerticalScrollIndicator={false}>
//               <View style={styles.container}>
//                 <Text style={styles.title}>Register</Text>

//                 <CustomInput
//   name="name"
//   value={name}
//   setValue={setName}
//   placeholder="Name"
//   secureTextEntry={false}
//   regexPattern={nameRegex}

//   onBlur={() => {
//     if (!/^[A-Za-z\s]{3,25}$/.test(name)) {
//       Alert.alert('Invalid Name', 'Name should contain only alphabets with a length between 3 and 25.');
//     }
//   }}
// />

//                 {/* <CustomInput
//                   name="phoneNumber"
//                   value={phoneNumber}
//                   setValue={setPhoneNumber}
//                   placeholder="Phone Number"
//                   onBlur={() => {
//                     if (!validatePhoneNumber()) {
//                       Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
//                     }
//                   }}
//                 /> */}
//                 {/* <TextInput
//                   name="phoneNumber"
//                   value={phoneNumber}
//                   setValue={setPhoneNumber}
//                   placeholder="Phone Number"
//                   style={{ ...styles.input, backgroundColor: 'white' }}
//                   keyboardType="numeric"
//                   maxLength={10}
//                   onBlur={() => {
//                     if (!validatePhoneNumber()) {
//                       Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
//                     }
//                   }}

//                 /> */}
//                 <TextInput
//   name="phoneNumber"
//   value={phoneNumber}
//   regexPattern={phoneNumberRegex}
//   onChangeText={(text) => {
//     setPhoneNumber(text);
//   }}
//   placeholder="Phone Number"
//   style={{ ...styles.input, backgroundColor: 'white' }}
//   keyboardType="numeric"
//   maxLength={10}
//   onBlur={() => {
//     if (!validatePhoneNumber()) {
//       Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
//     }
//   }}
// />

//                 <CustomInput
//                   name="designation"
//                   value={designation}
//                   setValue={setDesignation}
//                   regexPattern={designationRegex}
//                   placeholder="Designation"
//                   onBlur={() => {
//                     if (!validateDesignation()) {
//                       Alert.alert('Invalid Designation', 'Designation should contain only alphabets with a length between 3 and 50.');
//                     }
//                   }}
//                 />

//                 <CustomInput
//                   name="department"
//                   value={department}
//                   setValue={setDepartment}
//                   regexPattern={departmentRegex}
//                   placeholder="Department"
//                   onBlur={() => {
//                     if (!validateDepartment()) {
//                       Alert.alert('Invalid Department', 'Department should contain only alphabets with a length between 3 and 75.');
//                     }
//                   }}
//                 />

//                 <CustomInput
//                   name="address"
//                   value={address}
//                   setValue={setAddress}
//                   regexPattern={addressRegex}
//                   placeholder="Address"
//                   onBlur={() => {
//                     if (!validateAddress()) {
//                       Alert.alert('Invalid Address', 'Address should not be empty.');
//                     }
//                   }}
//                 />
//                 <CustomInput
//                   name="state"
//                   value={state}
//                   setValue={setState}
//                   regexPattern={stateRegex}
//                   placeholder="State"
//                   onBlur={() => {
//                     if (!validateState()) {
//                       Alert.alert('Invalid State', 'State should not be empty.');
//                     }
//                   }}
//                 />

//                 {/* <TextInput

//                   name="pinCode"
//                   value={pinCode}
//                   setValue={setPinCode}
//                   placeholder="PinCode"
//                   keyboardType="numeric"
//                   style={{ ...styles.input, backgroundColor: 'white' }}
//                   onChangeText={(text) => {
//                      setPinCode(text);
//                      }}
//                   onBlur={() => {
//                     if (!validatePinCode()) {
//                       Alert.alert('Invalid Pin', 'Pin should contain only 6 digits.');
//                     }
//                   }}
//                 /> */}
//                 <TextInput
//   name="pin"
//   value={pin}
//   onChangeText={(text) => {
//     setPinCode(text);
//   }}
//   placeholder="PinCode"
//   keyboardType="numeric"
//   style={{ ...styles.input, backgroundColor: 'white' }}
//   maxLength={6}
//   regexPattern={pinRegex}
//   onBlur={() => {
//     if (!validatePin()) {
//       Alert.alert('Invalid Pin', 'Pin should contain only 6 digits.');
//     }
//   }}
// />




//                 <CustomButton text="Register" onPress={onRegisterPressed} />

//                 <Text style={styles.text}>
//                   By registering, you confirm that you accept our{' '}
//                   <Text style={styles.link} onPress={onTermsOfUsePressed}>
//                     Terms of Use
//                   </Text>{' '}
//                   and{' '}
//                   <Text style={styles.link} onPress={onPrivacyPressed}>
//                     Privacy Policy
//                   </Text>
//                 </Text>

//                 <CustomButton
//                   text="Have an account? Sign in"
//                   onPress={onSignInPress}
//                   type="TERTIARY"
//                 />
//               </View>
//             </ScrollView>
//           </LinearGradient>
//         </Animatable.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#E4EAF7',
//   },
//   container2: {
//     flex: 1,
//     height: '100%',
//     backgroundColor: '#9AC5F4'
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#051C60',
//     marginVertical: 10,
//   },
//   text: {
//     color: 'gray',
//     marginVertical: 10,
//   },
//   link: {
//     color: '#FDB075',
//   },
//   input: {
//     //marginBottom: 15,
//     backgroundColor: '#E1EDF9',
//     paddingHorizontal: 10,
//    // paddingVertical: 10,
//     width: '100%',
//     fontSize: 14,
//     color: '#444',
//     borderColor: '#e8e8e8',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginVertical: 5,

//   },
// });

// export default SignUpScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput, ActivityIndicator, Image } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import '../global.js'
import { Platform } from 'react-native';
import Logo from '../../../assets/images/newlogoName.png';


const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [pin, setPinCode] = useState('');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false)
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
  //let url = global.server_url + "register.php";
  const [IsOffline, setIsOffline] = useState(false)
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  const nameRegex = /^[A-Za-z\s]{3,25}$/;
  const phoneNumberRegex = /^[0-9]{10}$/;
  const designationRegex = /^[\w\s,/&-]{3,50}$/;
  const departmentRegex = /^[\w\s,/&-]{3,100}$/;
  const addressRegex = /^[\w\s,/&-]*$/;
  const stateRegex = /^[\w\s,/&-]{3,50}$/;
  const pinRegex = /^[0-9]{6}$/;
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      console.log("offline:", offline)
      setIsOffline(offline);
    });


    return () => removeNetInfoSubscription();
  }, []);

  let brand = DeviceInfo.getBrand();
  let model = brand + " " + DeviceInfo.getModel()
  let os = Platform.OS
  let systemVersion = os + " " + DeviceInfo.getSystemVersion();
  console.log("model", systemVersion)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      phoneNumber: phoneNumber,
      designation: designation,
      department: department,
      address: address,
      state: state,
      pinCode: pin,
      mob_model: model,
      os_version: os,
    })
  };


  const register = async () => {
    try {
      fetch("http://192.168.43.22/Integrate/register.php", requestOptions, 100)
        .then((response) => response.json())
        .then(response => {
          console.log("Message: ", response.Message);
          if (response.Code == 3) {
            setIsLoading(false);
            registerSuccess();
          } else {
            alert(response.Message);
            setIsLoading(false);
            setName('');
            setPhoneNumber('');
            setDesignation('');
            setDepartment('');
            setAddress('');
            setState('');
            setPinCode('');
          }
        })
        .catch((error) => {
          Alert.alert("Some Error Occurred!");
          console.log(error)
          setIsLoading(false);
          setName('');
          setPhoneNumber('');
          setDesignation('');
          setDepartment('');
          setAddress('');
          setState('');
          setPinCode('');
        });
    } catch (error) {
      Alert.alert("Some Error Occurred!");
      console.log(error)
      setIsLoading(false);
      setName('');
      setPhoneNumber('');
      setDesignation('');
      setDepartment('');
      setAddress('');
      setState('');
      setPinCode('');
    }
  }

  // const registerSuccess = () => {
  //   setIsRegisterSuccess(true);

  //   setTimeout(() => {
  //     setIsRegisterSuccess(false);
  //     navigation.navigate("SignIn");
  //     setName('');
  //     setPhoneNumber('');
  //     setDesignation('');
  //     setDepartment('');
  //     setAddress('');
  //     setState('');
  //     setPinCode('');
  //   }, 3000);
  // }

  const registerSuccess = () => {
    setIsAnimationVisible(true);

    setTimeout(() => {
      setIsAnimationVisible(false);
      navigation.navigate("SignIn");
      setName('');
      setPhoneNumber('');
      setDesignation('');
      setDepartment('');
      setAddress('');
      setState('');
      setPinCode('');
    }, 3000);
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    navigation.navigate('Terms_Privacy');
  };

  const onPrivacyPressed = () => {
    navigation.navigate('Terms_Privacy');
  };

  const validateName = () => {
    const nameRegex = /^[A-Za-z0-9\s]{3,25}$/;
    return nameRegex.test(name);
  };

  const validatePhoneNumber = () => {
    // const phoneRegex = /^[0-9]{10}$/;
    const phoneRegex = /^[0-9]{0,10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateDesignation = () => {
    const designationRegex = /^[\w\s,/&-]{3,50}$/;
    return designationRegex.test(designation);
  };

  const validateDepartment = () => {
    const departmentRegex = /^[\w\s,/&-]{3,100}$/;
    return departmentRegex.test(department);
  };

  const validateAddress = () => {
    return address.trim().length > 0;
  };

  const validatePin = () => {
    const pinRegex = /^[0-9]{6}$/;
    return pinRegex.test(pin);
  };

  const validateState = () => {
    const stateRegex = /^[\w\s,/&-]{3,50}$/;
    return stateRegex.test(state) && state.length > 0;
  };

  const onRegisterPressed = () => {
    if (!validateName()) {
      Alert.alert('Invalid Name', 'Name should contain only alphabets with a length between 3 and 25.');
      return;
    }

    if (!validatePhoneNumber()) {
      Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
      return;
    }

    if (!validateDesignation()) {
      Alert.alert('Invalid Designation', 'Designation should contain only alphabets with a length between 3 and 50.');
      return;
    }

    if (!validateDepartment()) {
      Alert.alert('Invalid Department', 'Department should contain only alphabets with a length between 3 and 75.');
      return;
    }

    if (!validateAddress()) {
      Alert.alert('Invalid Address', 'Address should not be empty.');
      return;
    }

    if (!validatePin()) {
      Alert.alert('Invalid PinCode', 'PinCode should contain only 6 digits.');
      return;
    }

    if (!validateState()) {
      Alert.alert('Invalid State', 'State should not be empty.');
      return;
    }

    if (!IsOffline) {
      setIsLoading(true)
      register()
      // console.warn('Registration Successful');
      //navigation.navigate('Parent');
      //navigation.navigate('SignIn');
      navigation.navigate('RegisterSuccess')

    }
    else {
      Alert.alert("No internet connection")
    }
  };

  return (
    <Animatable.View animation="fadeInUp" style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <LinearGradient colors={['#E4EAF7', '#ffffff']} style={styles.linearGradient}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <CustomInput
              name="name"
              value={name}
              setValue={setName}
              placeholder="Name"
              secureTextEntry={false}
              regexPattern={nameRegex}

              onBlur={() => {
                if (!/^[A-Za-z\s]{3,25}$/.test(name)) {
                  Alert.alert('Invalid Name', 'Name should contain only alphabets with a length between 3 and 25.');
                }
              }}
            />
            <TextInput
              name="phoneNumber"
              value={phoneNumber}
              regexPattern={phoneNumberRegex}
              onChangeText={(text) => {
                setPhoneNumber(text);
              }}
              placeholder="Phone Number"
              style={{ ...styles.input, backgroundColor: 'white' }}
              keyboardType="numeric"
              maxLength={10}
              onBlur={() => {
                if (!validatePhoneNumber()) {
                  Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
                }
              }}
            />

            <CustomInput
              name="designation"
              value={designation}
              setValue={setDesignation}
              regexPattern={designationRegex}
              placeholder="Designation"
              onBlur={() => {
                if (!validateDesignation()) {
                  Alert.alert('Invalid Designation', 'Designation should contain only alphabets with a length between 3 and 50.');
                }
              }}
            />

            <CustomInput
              name="department"
              value={department}
              setValue={setDepartment}
              regexPattern={departmentRegex}
              placeholder="Department"
              onBlur={() => {
                if (!validateDepartment()) {
                  Alert.alert('Invalid Department', 'Department should contain only alphabets with a length between 3 and 75.');
                }
              }}
            />

            <CustomInput
              name="address"
              value={address}
              setValue={setAddress}
              regexPattern={addressRegex}
              placeholder="Address"
              onBlur={() => {
                if (!validateAddress()) {
                  Alert.alert('Invalid Address', 'Address should not be empty.');
                }
              }}
            />
            <CustomInput
              name="state"
              value={state}
              setValue={setState}
              regexPattern={stateRegex}
              placeholder="State"
              onBlur={() => {
                if (!validateState()) {
                  Alert.alert('Invalid State', 'State should not be empty.');
                }
              }}
            />

            {/* <TextInput

                  name="pinCode"
                  value={pinCode}
                  setValue={setPinCode}
                  placeholder="PinCode"
                  keyboardType="numeric"
                  style={{ ...styles.input, backgroundColor: 'white' }}
                  onChangeText={(text) => {
                     setPinCode(text);
                     }}
                  onBlur={() => {
                    if (!validatePinCode()) {
                      Alert.alert('Invalid Pin', 'Pin should contain only 6 digits.');
                    }
                  }}
                /> */}
            <TextInput
              name="pin"
              value={pin}
              onChangeText={(text) => {
                setPinCode(text);
              }}
              placeholder="PinCode"
              keyboardType="numeric"
              style={{ ...styles.input, backgroundColor: 'white' }}
              maxLength={6}
              regexPattern={pinRegex}
              onBlur={() => {
                if (!validatePin()) {
                  Alert.alert('Invalid Pin', 'Pin should contain only 6 digits.');
                }
              }}
            />




            <CustomButton text="Register" onPress={onRegisterPressed} />

            <Text style={styles.text}>
              By registering, you confirm that you accept our{' '}
              <Text style={styles.link} onPress={onTermsOfUsePressed}>
                Terms of Use
              </Text>{' '}
              and{' '}
              <Text style={styles.link} onPress={onPrivacyPressed}>
                Privacy Policy
              </Text>
            </Text>

            <CustomButton
              text="Have an account? Sign in"
              onPress={onSignInPress}
              type="TERTIARY"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E4EAF7',
  },
  container2: {
    flex: 1,
    height: '100%',
    backgroundColor: '#9AC5F4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    marginVertical: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  input: {
    //marginBottom: 15,
    backgroundColor: '#E1EDF9',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    width: '100%',
    fontSize: 14,
    color: '#444',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,

  },
  linearGradient: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 50,
    alignSelf: 'center',
  },
});

export default SignUpScreen;
