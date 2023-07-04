
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
  TextInput,
} from 'react-native';
import MapView, { UrlTile, Marker, WMSTile, name, location, type, landuseClass, shapeType } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from 'react-native-dialog';



const MainScreen = () => {
  const [mLat, setMLat] = useState(null);
  const [mLong, setMLong] = useState(null);
  const [markerColor, setMarkerColor] = useState('blue');
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [mapType, setMapType] = useState('none');
  const [showMapOptions, setShowMapOptions] = useState(false);
  const navigation = useNavigation();
  const [layer, setLayer] = useState('osm');
  const [searchInput, setSearchInput] = useState('');

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

  const handleMapOptionsPress = () => {
    setShowMapOptions(true);

  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  }
  const windowHeight = Dimensions.get('window').height * 1.3;

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {layer == 'osm' ?
          <MapView
            style={{ ...styles.map, height: windowHeight }}
            region={{
              latitude: 28.6139,
              longitude: 77.2090,
              latitudeDelta: 20,
              longitudeDelta: 30
            }}
            provider={undefined}
            mapType={"none"}
            showsUserLocation={true}
            // style={{height:'100%',width:'100%'}}
            showsTraffic={false}
            zoomEnabled={true}
            showsCompass={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            loadingEnabled={true}
            showsBuildings={true}
            onLongPress={handleMapLongPress}>


            <WMSTile
              urlTemplate={'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg'}
              zIndex={1}
              epsgSpec={"EPSG:90031"}
            />
            {selectedCoordinate && <Marker coordinate={selectedCoordinate} pinColor="red" />}

          </MapView> :

          <MapView
            style={{ ...styles.map, height: windowHeight }}
            region={{
              latitude: 28.6139,
              longitude: 77.2090,
              latitudeDelta: 20,
              longitudeDelta: 30,
            }}

            provider={undefined}
            mapType={"none"}
            showsUserLocation={true}
            //style={{height:'100%',width:'100%'}}
            showsTraffic={false}
            zoomEnabled={true}
            showsCompass={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            loadingEnabled={true}
            showsBuildings={true}
            onLongPress={handleMapLongPress}>

            <UrlTile
              urlTemplate={'https://tile.openstreetmap.de/{z}/{x}/{y}.png'}
              zIndex={1}
              epsgSpec={"EPSG:90031"}

            />
          </MapView>}
      </View>
      <TouchableOpacity style={styles.searchIconContainer} onPress={handleSearchPress}>
        <Icon name="search" size={24} color="#333" />
      </TouchableOpacity>
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

      {/* <Dialog.Container visible={showMapOptions}>
        <Dialog.Title>Map Options</Dialog.Title>
        <Dialog.Description>Choose a map option:</Dialog.Description>
        <Dialog.Button
          label={<Image source={require('../../../assets/images/default.png')} style={styles.dialogImage} />}
          onPress={() => { setLayer('bhuvan'); setShowMapOptions(false) }} //setUrl('https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg')}
        />
        <Dialog.Button
          label={<Image source={require('../../../assets/images/osm.png')} style={styles.dialogImage} />}
          onPress={() => { setLayer('osm'); setShowMapOptions(false) }}//setUrl('https://tile.openstreetmap.de/{z}/{x}/{y}.png')}
        />
        <Dialog.Button label="Cancel" onPress={() => setShowMapOptions(false)} />
      </Dialog.Container> */}

      <Dialog.Container visible={showMapOptions}>
  <Dialog.Title>Map Options</Dialog.Title>
  <Dialog.Description>Choose a map option:</Dialog.Description>
  <Dialog.Button
    label={
      <>
        <Image source={require('../../../assets/images/default.png')} style={styles.dialogImage} />
        <Text style={styles.buttonText}>OSM</Text>
      </>
    }
    onPress={() => {
      setLayer('bhuvan');
      setShowMapOptions(false);
    }}
  />
  <Dialog.Button
    label={
      <>
        <Image source={require('../../../assets/images/osm.png')} style={styles.dialogImage} />
        <Text style={styles.buttonText}>Default</Text> 
      </>
    }
    onPress={() => {
      setLayer('osm');
      setShowMapOptions(false);
    }}
  />
  <Dialog.Button label="Cancel" onPress={() => setShowMapOptions(false)} />
</Dialog.Container>

    </View >

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
  map: {
    width: '100%',
    height: '120%',
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
  searchIconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },

});

export default MainScreen;