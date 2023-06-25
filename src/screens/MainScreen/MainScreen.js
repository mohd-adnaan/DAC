// import React, { useEffect, useState } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   PermissionsAndroid
// } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';

// const MainScreen = () => {
//   const [mLat, setMLat] = useState(28.6139);
//   const [mLong, setMLong] = useState(77.2090);
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
//         setMLat(position.coords.latitude)
//         setMLong(position.coords.longitude)
//       },
//       error => {
//         console.log(error.code, error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={{ width: '100%', height: '100%' }}
//         initialRegion={{
//           latitude: mLat,
//           longitude: mLong,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker
//           coordinate={{ latitude: mLat, longitude: mLong }}
//         />
//       </MapView>
//       <TouchableOpacity
//         style={{
//           width: '90%',
//           height: 50,
//           alignSelf: 'center',
//           position: 'absolute',
//           bottom: 20,
//           backgroundColor: 'green',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//         onPress={() => {
//           getLocation();
//         }}
//       >
//         <Text style={{ color: '#fff' }}>Get Current Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

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
} from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';

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

  const handleMapPress = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedCoordinate({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 28.6139, // New Delhi coordinates
          longitude: 77.2090,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
        provider={undefined}
        mapType={'none'}
        zoomEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
        onPress={handleMapPress}
      >
        <UrlTile
          urlTemplate={'https://tile.openstreetmap.de/{z}/{x}/{y}.png'}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => {
              navigation.navigate('Bhuvan');
            }}
          >
            <Text style={styles.buttonText}>Bhuvan Map</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'blue' }]}
            onPress={() => {
              getLocation();
            }}
          >
            <Text style={styles.buttonText}>Get Current Location</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Current Location: {mLat !== null ? mLat : 28.6139}, {mLong !== null ? mLong : 77.2090}
        </Text>
        {selectedCoordinate && (
          <Text style={styles.footerText}>
            Selected Coordinate: {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
          </Text>
        )}
        <Text style={styles.footerText}>Design and Develop by NRSC-ISRO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4EAF7',
  },
  map: {
    width: '100%',
    height: '120%',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  footer: {
    backgroundColor: '#E4EAF7',
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
    fontSize: 12,
    marginTop: 10,
  },
});

export default MainScreen;