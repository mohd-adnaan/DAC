// import * as Animatable from 'react-native-animatable';
// import React,{ useState,useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNRestart from 'react-native-restart';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { Text, TextInput, View,StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const UserScreen = () =>{
//     const [name,setName]=useState('');
//     const [phoneNumber,setPhoneNumber]=useState('')
//     const [designation,setDesignation]=useState('')
//     const [department,setDepartment]=useState('')
//     const [address,setAddress]=useState('')
//     const navigation = useNavigation();
//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', () => {
//             display();
//         });
//         return unsubscribe;
//       }, [navigation]);
//       const display =async ()=>{  
//         try{  
//           let name =  await AsyncStorage.getItem('name');
//           let phoneNumber= await AsyncStorage.getItem('phoneNumber');
//           let designation =await AsyncStorage.getItem('designation');
//           let department = await AsyncStorage.getItem('department');
//           let address=await AsyncStorage.getItem('address')
//           let state=await AsyncStorage.getItem('state')
//           let pinCode=await AsyncStorage.getItem('pinCode')
//           console.log("name:",name)
//           address=address+", "+state+","+pinCode
//           setAddress(address);
//           setPhoneNumber(phoneNumber);
//           setDesignation(designation);
//           setDepartment(department);
//           setName(name);              
            
           
//         }  
//         catch(error){  
//           console.log(error) 
//         }  
//       }

//     return(
//         <Animatable.View animation="zoomInUp" style={{flex:1,flexDirection:'column',backgroundColor:'#ffffff'}}>
//         <View style={{width:'100%',height:'40%',backgroundColor:'#ffffff'}}>
//           <View style={{height:'70%',backgroundColor:'#9AC5F4'}}>          </View>
//           <View style={{backgroundColor:'#ffffff',justifyContent:'center',width:'90%',height:'70%',alignSelf:'center',marginTop:-100,borderRadius:20,elevation:20}}>
//           <MaterialIcons
//             name="account-circle"
//             size={100}
//             color="#9AC5F4"
//             style={{alignSelf:'center',}}
//           />
//           <Text style={{color:'#000000',fontSize:20,alignSelf:'center',}}>{name}</Text>
//           </View>
//         </View>
//         <View style={{marginTop:'10%',}}>
//         <View style={{flexDirection:'row',width:'90%'}}>
//         <MaterialIcons
//             name="smartphone"
//             size={40}
//             color="#9AC5F4"/>
//             <Text style={{color:'#000000',alignSelf:'center',fontSize:22,marginLeft:20}}>+91 {phoneNumber}</Text>
//         </View>
        
//         <View style={{flexDirection:'row',marginTop:'5%',width:'90%'}}>
//         <MaterialIcons
//             name="email"
//             size={40}
//             color= "#9AC5F4"/>
//           <Text style={{color:'#000000',fontSize:16,alignSelf:'center',marginBottom:'2%'}}>{designation}</Text>

//         </View>
        
//         <View style={{flexDirection:'row',marginTop:'5%',width:'90%'}}>
//         <MaterialIcons
//             name="building"
//             size={40}
//             color="#9AC5F4"/>
//                <Text style={{color:'#000000',fontSize:16,alignSelf:'center',marginBottom:'2%'}}>{department}</Text>

//         </View>



//         <View style={{flexDirection:'row',marginTop:'5%',width:'90%'}}>
//         <MaterialIcons
//             name="location-city"
//             size={40}
//             color="#9AC5F4"/>
//             <Text style={{color:'#000000',alignSelf:'center',fontSize:22,marginLeft:20}}>{address}</Text>
//         </View>
        
        
//             <TouchableOpacity 
//                 onPress={()=>{  Alert.alert("Hold on!", "Are you sure you want to logout?", [
//               {
//                 text: "No",
//                 onPress: () => null,
//                 style: "cancel"
//               },
//               { text: "YES", onPress: () => {AsyncStorage.clear();
//                                 RNRestart.Restart()
                

//                } }
//             ]);}}
//                 style={{backgroundColor:'#E4EAF7',width:'80%',alignSelf:'center',height:50,borderRadius:10,flexDirection:'column',justifyContent:'center',marginTop:'5%'}}>
//                 <Text style={{color:'#ffffff',alignSelf:'center',fontSize:22}}>Logout</Text>
//             </TouchableOpacity>
            
//             </View>
//         </Animatable.View>
//     )

// }

// export default UserScreen;


// import * as Animatable from 'react-native-animatable';
// import React, { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNRestart from 'react-native-restart';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { Text, TextInput, View, StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const UserScreen = () => {
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [department, setDepartment] = useState('');
//   const [address, setAddress] = useState('');
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       display();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const display = async () => {
//     try {
//       let name = await AsyncStorage.getItem('name');
//       let phoneNumber = await AsyncStorage.getItem('phoneNumber');
//       let designation = await AsyncStorage.getItem('designation');
//       let department = await AsyncStorage.getItem('department');
//       let address = await AsyncStorage.getItem('address');
//       let state = await AsyncStorage.getItem('state');
//       let pinCode = await AsyncStorage.getItem('pinCode');
//       console.log("name:", name);
//       address = address + ", " + state + ", " +  pinCode;
//       setAddress(address);
//       setPhoneNumber(phoneNumber);
//       setDesignation(designation);
//       setDepartment(department);
//       setName(name);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <Animatable.View animation="zoomInUp" style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffffff' }}>
//       <View style={{ width: '100%', height: '40%', backgroundColor: '#ffffff' }}>
//         <View style={{ height: '70%', backgroundColor: '#9AC5F4' }}></View>
//         <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', width: '90%', height: '70%', alignSelf: 'center', marginTop: -100, borderRadius: 20, elevation: 20 }}>
//           <MaterialIcons
//             name="account-circle"
//             size={100}
//             color="#9AC5F4"
//             style={{ alignSelf: 'center', }}
//           />
//           <Text style={{ color: '#000000', fontSize: 20, alignSelf: 'center' }}>{name}</Text>
//         </View>
//       </View>
//       <View style={{ marginTop: '10%' }}>
//         <View style={{ flexDirection: 'row', width: '90%' }}>
//           <MaterialIcons
//             name="smartphone"
//             size={35}
//             color="#9AC5F4" />
//           <Text style={{ color: '#000000', alignSelf: 'center', fontSize: 20, marginLeft: 20 }}>+91 {phoneNumber}</Text>
//         </View>

//         <View style={{ flexDirection: 'row', marginTop: '5%', width: '90%' }}>
//           <MaterialIcons
//             name="email"
//             size={35}
//             color="#9AC5F4" />
//           <Text style={{ color: '#000000', fontSize: 20, alignSelf: 'center', marginBottom: '2%', marginLeft :20}}>{designation}</Text>
//         </View>

//         <View style={{ flexDirection: 'row', marginTop: '5%', width: '90%' }}>
//         <MaterialIcons
//   name="building"
//   size={40}
//   color="#9AC5F4"
//   style={{ marginLeft: 5 }}
// />

//           <Text style={{ color: '#000000', fontSize: 20, alignSelf: 'center', marginBottom: '2%',marginLeft:28 }}>{department}</Text>
//         </View>

//         <View style={{ flexDirection: 'row', marginTop: '5%', width: '90%' }}>
//           <MaterialIcons
//             name="location-city"
//             size={35}
//             color="#9AC5F4" />
//           <Text style={{ color: '#000000', alignSelf: 'center', fontSize: 20, marginLeft: 20 }}>{address}</Text>
//         </View>

//         <TouchableOpacity
//           onPress={() => {
//             Alert.alert("Hold on!", "Are you sure you want to logout?", [
//               {
//                 text: "No",
//                 onPress: () => null,
//                 style: "cancel"
//               },
//               {
//                 text: "YES", onPress: () => {
//                   AsyncStorage.clear();
//                   RNRestart.Restart();
//                 }
//               }
//             ]);
//           }}
//           style={{ backgroundColor: '#1E88E5', width: '80%', alignSelf: 'center', height: 50, borderRadius: 10, flexDirection: 'column', justifyContent: 'center', marginTop: '5%' }}>
//           <Text style={{ color: '#ffffff', alignSelf: 'center', fontSize: 22 }}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </Animatable.View>
//   );
// }

// export default UserScreen;



import * as Animatable from 'react-native-animatable';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, TextInput, View, StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      display();
    });
    return unsubscribe;
  }, [navigation]);

  const display = async () => {
    try {
      let name = await AsyncStorage.getItem('name');
      let phoneNumber = await AsyncStorage.getItem('phoneNumber');
      let designation = await AsyncStorage.getItem('designation');
      let department = await AsyncStorage.getItem('department');
      let address = await AsyncStorage.getItem('address');
      let state = await AsyncStorage.getItem('state');
      let pinCode = await AsyncStorage.getItem('pinCode');
      console.log("name:", name);
      address = address + ", " + state + ", " +  pinCode;
      setAddress(address);
      setPhoneNumber(phoneNumber);
      setDesignation(designation);
      setDepartment(department);
      setName(name);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Animatable.View animation="zoomInUp" style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <View style={{ width: '100%', height: '40%', backgroundColor: '#ffffff' }}>
        <View style={{ height: '70%', backgroundColor: '#9AC5F4' }}></View>
        <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', width: '90%', height: '70%', alignSelf: 'center', marginTop: -100, borderRadius: 20, elevation: 20 }}>
          <MaterialIcons
            name="account-circle"
            size={100}
            color="#9AC5F4"
            style={{ alignSelf: 'center' }}
          />
          <Text style={{ color: '#000000', fontSize: 20, alignSelf: 'center' }}>{name}</Text>
        </View>
        <TouchableOpacity style={styles.closeIconContainer} onPress={() => navigation.goBack()}>
          <Icon
            name="ios-close-circle"
            color="gray"
            size={45}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: '10%' }}>
        <View style={{ flexDirection: 'row', width: '90%' }}>
          <MaterialIcons
            name="smartphone"
            size={35}
            color="#9AC5F4" />
          <Text style={{ color: '#000000', alignSelf: 'center', fontSize: 20, marginLeft: 20 }}>+91 {phoneNumber}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: '2%', width: '90%' }}>
          <MaterialIcons
            name="email"
            size={35}
            color="#9AC5F4" />
          <Text style={{ color: '#000000', fontSize: 20, alignSelf: 'center', marginBottom: '2%', marginLeft: 20 }}>{designation}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: '2%', width: '90%' }}>
          <MaterialIcons
            name="building"
            size={40}
            color="#9AC5F4"
            style={{ marginLeft: 5 }}
          />
          <Text style={{ color: '#000000', fontSize: 20, alignSelf: 'center', marginBottom: '2%', marginLeft: 28 }}>{department}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: '2%', width: '90%' }}>
          <MaterialIcons
            name="location-city"
            size={35}
            color="#9AC5F4" />
          <Text style={{ color: '#000000', alignSelf: 'center', fontSize: 20, marginLeft: 20 }}>{address}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("Hold on!", "Are you sure you want to logout?", [
              {
                text: "No",
                onPress: () => null,
                style: "cancel"
              },
              {
                text: "YES", onPress: () => {
                  AsyncStorage.clear();
                  RNRestart.Restart();
                }
              }
            ]);
          }}
          style={{ backgroundColor: '#1E88E5', width: '80%', alignSelf: 'center', height: 50, borderRadius: 10, flexDirection: 'column', justifyContent: 'center', marginTop: '2%' }}>
          <Text style={{ color: '#ffffff', alignSelf: 'center', fontSize: 20 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
  },
});

export default UserScreen;
