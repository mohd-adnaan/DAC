import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Alert,
} from 'react-native';
import MapView, { UrlTile, Marker, WMSTile } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';

const MainScreen = () => {
  const [mLat, setMLat] = useState(null);
  const [mLong, setMLong] = useState(null);
  const [markerColor, setMarkerColor] = useState('blue');
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'DAC ask for Location Permission',
          message: 'DAC needs access to your Location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setMLat(position.coords.latitude);
        setMLong(position.coords.longitude);
        setMarkerColor('red');
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleMapLongPress = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log('Marked coordinates:', latitude, longitude);
    setSelectedCoordinate({ latitude, longitude });
    Alert.alert(
      'Marked Coordinates',
      `Latitude: ${latitude.toFixed(4)}\nLongitude: ${longitude.toFixed(4)}`
    );
  };

  const handleSupportPress = () => {
    navigation.navigate('Support');
  };

  const handleLogoPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogoPress}>
          <Image source={require('../../../assets/images/home.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.headerText}>DAC</Text>
        <TouchableOpacity onPress={handleSupportPress}>
          <Icon name="information-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: 28.6139, // New Delhi coordinates
          longitude: 77.2090,
          latitudeDelta: 10,
          longitudeDelta: 25,
        }}
        provider={undefined}
        mapType={'none'}
        zoomEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
        onLongPress={handleMapLongPress} // Changed event name to onLongPress
      >
        <WMSTile
          urlTemplate={ 'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg'}
          zIndex={1}
          epsgSpec={'EPSG:4326'}
        />
        {selectedCoordinate && (
          <Marker
            coordinate={selectedCoordinate}
            pinColor="green"
          />
        )}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your Current Location: {mLat !== null ? mLat.toFixed(4) : 28.6139}, {mLong !== null ? mLong.toFixed(4) : 77.2090}
        </Text>
        
        <Text style={[styles.footerText, { fontSize: 12 }]}>Design and Develop by NRSC-ISRO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4EAF7',
  },
  header: {
    backgroundColor: '#9AC5F4',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  map: {
    width: '100%',
    height: '120%',
  },
  footer: {
    backgroundColor: '#9AC5F4',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    color: '#333',
    fontSize: 14,
    marginTop: 10,
  },
});

export default MainScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Image,
//   Alert,
// } from 'react-native';
// import MapView, { UrlTile, Marker, WMSTile } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { DrawerActions } from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const MainScreen = () => {
//   const [mLat, setMLat] = useState(null);
//   const [mLong, setMLong] = useState(null);
//   const [markerColor, setMarkerColor] = useState('blue');
//   const [selectedCoordinate, setSelectedCoordinate] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     requestCameraPermission();
//   }, []);

//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'DAC ask for Location Permission',
//           message: 'DAC needs access to your Location ',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the location');
//         getLocation();
//       } else {
//         console.log('Location permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         console.log(position);
//         setMLat(position.coords.latitude);
//         setMLong(position.coords.longitude);
//         setMarkerColor('red');
//       },
//       error => {
//         console.log(error.code, error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const handleMapLongPress = event => {
//     const { latitude, longitude } = event.nativeEvent.coordinate;
//     console.log('Marked coordinates:', latitude, longitude);
//     setSelectedCoordinate({ latitude, longitude });
//     Alert.alert(
//       'Marked Coordinates',
//       `Latitude: ${latitude.toFixed(4)}\nLongitude: ${longitude.toFixed(4)}`
//     );
//   };

//   const handleSupportPress = () => {
//     navigation.navigate('Support');
//   };

//   const handleLogoPress = () => {
//     navigation.dispatch(DrawerActions.openDrawer());
//   };

//   const handleLogoutPress = () => {
//     navigation.navigate('SignIn'); // Replace 'SignIn' with your sign-in screen name
//   };

//   const handleAboutPress = () => {
//     navigation.navigate('Drawer'); // Replace 'About' with your about screen name
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleLogoPress}>
//           <Image source={require('../../../assets/images/home.png')} style={styles.logo} />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>DAC</Text>
//         <TouchableOpacity onPress={handleSupportPress}>
//           <Icon name="information-circle-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <MapView
//         style={styles.map}
//         region={{
//           latitude: 28.6139, // New Delhi coordinates
//           longitude: 77.2090,
//           latitudeDelta: 10,
//           longitudeDelta: 25,
//         }}
//         provider={undefined}
//         mapType={'none'}
//         zoomEnabled={true}
//         showsUserLocation={true}
//         followsUserLocation={true}
//         loadingEnabled={true}
//         onLongPress={handleMapLongPress} // Changed event name to onLongPress
//       >
//         <WMSTile
//           urlTemplate={ 'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg'}
//           zIndex={1}
//           epsgSpec={'EPSG:4326'}
//         />
//         {selectedCoordinate && (
//           <Marker
//             coordinate={selectedCoordinate}
//             pinColor="green"
//           />
//         )}
//       </MapView>

//       <View style={styles.footer}>
//         <TouchableOpacity onPress={handleLogoutPress}>
//           <MaterialCommunityIcons name="logout" size={24} color="#333" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleAboutPress}>
//           <MaterialCommunityIcons name="information-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E4EAF7',
//   },
//   header: {
//     backgroundColor: '#9AC5F4',
//     paddingVertical: 10,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   headerText: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#333',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   logo: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//   },
//   map: {
//     width: '100%',
//     height: '120%',
//   },
//   footer: {
//     backgroundColor: '#9AC5F4',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
// });
