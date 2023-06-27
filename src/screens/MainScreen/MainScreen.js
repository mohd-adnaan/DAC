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
//         <Text style={styles.footerText}>
//           Your Current Location: {mLat !== null ? mLat.toFixed(4) : 28.6139}, {mLong !== null ? mLong.toFixed(4) : 77.2090}
//         </Text>
        
//         <Text style={[styles.footerText, { fontSize: 12 }]}>Design and Develop by NRSC-ISRO</Text>
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
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   footerText: {
//     color: '#333',
//     fontSize: 14,
//     marginTop: 10,
//   },
// });

// export default MainScreen;









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
import MapView, { UrlTile, Marker, WMSTile, type, location, mapType, shapeType, landuseClass, name } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import Dialog from 'react-native-dialog';

const MainScreen = () => {
  const [mLat, setMLat] = useState(null);
  const [mLong, setMLong] = useState(null);
  const [markerColor, setMarkerColor] = useState('blue');
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [mapType, setMapType] = useState('none');
  const [showMapOptions, setShowMapOptions] = useState(false);
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

  const handleMapOptionsPress = () => {
    setShowMapOptions(true);
  };

  const handleMapOptionSelected = option => {
    if (option === 'Default') {
      setMapType('none');
      setShowMapOptions(false);
    } else if (option === 'OpenStreetMap') {
      navigation.navigate('Main', {
        url: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
        type: 'OpenStreetMap',
        shapeType: shapeType,
        landuseClass: landuseClass,
        name: name,
        location: location,
      });
    }
  };

  const windowHeight = Dimensions.get('window').height * 1.2;

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
      <View style={styles.mapContainer}>
      <MapView
        style={{ ...styles.map, height: windowHeight }}
        region={{
          latitude: 28.6139, // New Delhi coordinates
          longitude: 77.2090,
          latitudeDelta: 12,
          longitudeDelta: 12,
        }}
        provider={undefined}
        mapType={mapType}
        zoomEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
        onLongPress={handleMapLongPress} // Changed event name to onLongPress
      >
        {mapType === 'OpenStreetMap' ? (
          <UrlTile urlTemplate={'https://tile.openstreetmap.de/{z}/{x}/{y}.png'} zIndex={1} epsgSpec={'EPSG:4326'} />
        ) : null}

        <WMSTile
          urlTemplate={
            'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg'
          }
          zIndex={1}
          epsgSpec={'EPSG:4326'}
        />
        {selectedCoordinate && <Marker coordinate={selectedCoordinate} pinColor="green" />}
      </MapView>
      </View>
      <View style={styles.footer}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Your Current Location: {mLat !== null ? mLat.toFixed(4) : 28.6139},{' '}
            {mLong !== null ? mLong.toFixed(4) : 77.2090}
          </Text>
          <Text style={[styles.footerText, styles.designText]}>Design and Develop by NRSC-ISRO</Text>
        </View>
        <TouchableOpacity style={styles.mapOptionsIcon} onPress={handleMapOptionsPress}>
          <Icon name="options" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Dialog.Container visible={showMapOptions}>
        <Dialog.Title>Map Options</Dialog.Title>
        <Dialog.Description>Choose a map option:</Dialog.Description>
        <Dialog.Button
          label={<Image source={require('../../../assets/images/default.png')} style={styles.dialogImage} />}
          // label="Default"
          onPress={() => handleMapOptionSelected('Default')}
        />
        <Dialog.Button
          label={<Image source={require('../../../assets/images/osm.png')} style={styles.dialogImage} />}
          // label="OpenStreetMap"
          onPress={() => handleMapOptionSelected('OpenStreetMap')}
        />
        <Dialog.Button label="Cancel" onPress={() => setShowMapOptions(false)} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4EAF7',
  }, 
   mapContainer: {
    flex: 1.2,
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
    width: 28,
    height: 28,
    marginRight: 5,
    marginRight: 5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  footer: {
    backgroundColor: '#9AC5F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  designText: {
    fontSize: 12,
    marginTop: 5,
  },
  mapOptionsIcon: {
    marginLeft: 10,
  },
  dialogImage: {
    width: 60,
    height: 60,
    marginRight: 10,
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
// import MapView, { UrlTile, Marker, WMSTile, type, location, mapType, shapeType, landuseClass, name } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { DrawerActions } from '@react-navigation/native';
// import Dialog from 'react-native-dialog';


// const MainScreen = () => {
//   const [mLat, setMLat] = useState(null);
//   const [mLong, setMLong] = useState(null);
//   const [markerColor, setMarkerColor] = useState('blue');
//   const [selectedCoordinate, setSelectedCoordinate] = useState(null);
//   const [mapType, setMapType] = useState('none');
//   const [showMapOptions, setShowMapOptions] = useState(false);
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
//     //navigation.dispatch(DrawerActions.openDrawer());
//     navigation.navigate('DrawerNavigator');
//   };

//   const handleMapOptionsPress = () => {
//     setShowMapOptions(true);
//   };

//   const handleMapOptionSelected = option => {
//     if (option === 'Default') {
//       setMapType('none');
//       setShowMapOptions(false);
//     } else if (option === 'OpenStreetMap') {
//       navigation.navigate('Main', {
//         url: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
//         type: 'OpenStreetMap',
//         shapeType: shapeType,
//         landuseClass: landuseClass,
//         name: name,
//         location: location,
//       });
//     }
//   };

//   const windowHeight = Dimensions.get('window').height * 1.2;

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
//       <View style={styles.mapContainer}>
//       <MapView
//         style={{ ...styles.map, height: windowHeight }}
//         region={{
//           latitude: 28.6139, // New Delhi coordinates
//           longitude: 77.2090,
//           latitudeDelta: 12,
//           longitudeDelta: 12,
//         }}
//         provider={undefined}
//         mapType={mapType}
//         zoomEnabled={true}
//         showsUserLocation={true}
//         followsUserLocation={true}
//         loadingEnabled={true}
//         onLongPress={handleMapLongPress} // Changed event name to onLongPress
//       >
//         {mapType === 'OpenStreetMap' ? (
//           <UrlTile urlTemplate={'https://tile.openstreetmap.de/{z}/{x}/{y}.png'} zIndex={1} epsgSpec={'EPSG:4326'} />
//         ) : null}

//         <WMSTile
//           urlTemplate={
//             'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg'
//           }
//           zIndex={1}
//           epsgSpec={'EPSG:4326'}
//         />
//         {selectedCoordinate && <Marker coordinate={selectedCoordinate} pinColor="green" />}
//       </MapView>
//       </View>
//       <View style={styles.footer}>
//         <View style={styles.locationContainer}>
//           <Text style={styles.locationText}>
//             Your Current Location: {mLat !== null ? mLat.toFixed(4) : 28.6139},{' '}
//             {mLong !== null ? mLong.toFixed(4) : 77.2090}
//           </Text>
//           <Text style={[styles.footerText, styles.designText]}>Design and Develop by NRSC-ISRO</Text>
//         </View>
//         <TouchableOpacity style={styles.mapOptionsIcon} onPress={handleMapOptionsPress}>
//           <Icon name="options" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <Dialog.Container visible={showMapOptions}>
//         <Dialog.Title>Map Options</Dialog.Title>
//         <Dialog.Description>Choose a map option:</Dialog.Description>
//         <Dialog.Button
//           label={<Image source={require('../../../assets/images/default.png')} style={styles.dialogImage} />}
//           // label="Default"
//           onPress={() => handleMapOptionSelected('Default')}
//         />
//         <Dialog.Button
//           label={<Image source={require('../../../assets/images/osm.png')} style={styles.dialogImage} />}
//           // label="OpenStreetMap"
//           onPress={() => handleMapOptionSelected('OpenStreetMap')}
//         />
//         <Dialog.Button label="Cancel" onPress={() => setShowMapOptions(false)} />
//       </Dialog.Container>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E4EAF7',
//   }, 
//    mapContainer: {
//     flex: 1.2,
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
//     width: 28,
//     height: 28,
//     marginRight: 5,
//     marginRight: 5,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
//   footer: {
//     backgroundColor: '#9AC5F4',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   locationContainer: {
//     flex: 1,
//   },
//   locationText: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 5,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   designText: {
//     fontSize: 12,
//     marginTop: 5,
//   },
//   mapOptionsIcon: {
//     marginLeft: 10,
//   },
//   dialogImage: {
//     width: 60,
//     height: 60,
//     marginRight: 10,
//   },
// });

// export default MainScreen;
