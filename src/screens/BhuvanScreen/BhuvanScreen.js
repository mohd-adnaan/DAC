import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { WMSTile, Marker ,shapeType,landuseClass,name,location} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';

const BhuvanScreen = () => {
  const [mLat, setMLat] = useState(28.6139);
  const [mLong, setMLong] = useState(77.2090);
  const navigation = useNavigation();

  useEffect(() => {
    requestCameraPermission();
    getCurrentLocation();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'DAC asks for Location Permission',
          message: 'DAC needs access to your Location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setMLat(position.coords.latitude);
        setMLong(position.coords.longitude);
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
    setMLat(latitude);
    setMLong(longitude);
  };

  const handleDefaultMapPress = () => {
    navigation.navigate('Bhuvan', {
      url:
        'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg',
      type: 'default',
      shapeType: shapeType,
      landuseClass: landuseClass,
      name: name,
      location: location,
    });
  };

  const handleOpenMapPress = () => {
    navigation.navigate('Main', {
      url: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
      type: 'osm',
      shapeType: shapeType,
      landuseClass: landuseClass,
      name: name,
      location: location,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoName}>DAC</Text>
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
        provider={undefined}
        mapType="none"
        zoomEnabled={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        loadingEnabled={true}
        onLongPress={handleMapLongPress}
      >
        <WMSTile
          urlTemplate="https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg"
          zIndex={1}
          epsgSpec="EPSG:4326"
        />
        <Marker coordinate={{ latitude: mLat, longitude: mLong }} />
      </MapView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleDefaultMapPress}
        >
          <Image
            style={styles.footerButtonImage}
            source={require('../../../assets/images/default.png')}
          />
          <Text style={styles.footerButtonText}>Default</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleOpenMapPress}
        >
          <Image
            style={styles.footerButtonImage}
            source={require('../../../assets/images/osm.png')}
          />
          <Text style={styles.footerButtonText}>Open Map</Text>
        </TouchableOpacity>

        <View style={styles.footerCoordinates}>
          <Text style={styles.footerText}>
            Marked Latitude: {mLat.toFixed(6)}
          </Text>
          <Text style={styles.footerText}>
            Marked Longitude: {mLong.toFixed(6)}
          </Text>
          <Text style={styles.footerText}>
            Current Latitude: {mLat.toFixed(6)}
          </Text>
          <Text style={styles.footerText}>
            Current Longitude: {mLong.toFixed(6)}
          </Text>
        </View>

        <Text style={styles.footerText}>
          Design and Develop by NRSC, ISRO
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#E4EAF7',
  },
  logoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    height: '120%',
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#E4EAF7',
  },
  footerButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  footerButtonImage: {
    width: 30,
    height: 30,
  },
  footerButtonText: {
    fontSize: 12,
    marginTop: 5,
  },
  footerCoordinates: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 12,
    marginRight: 10,
  },
});

export default BhuvanScreen;
