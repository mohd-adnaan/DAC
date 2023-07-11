import React, { useEffect, useState, useRef } from 'react';
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
  Animated,
  BackHandler,
  Modal,
  Button,
} from 'react-native';
import MapView, {
  UrlTile,
  Marker,
  WMSTile,
  name,
  location,
  type,
  landuseClass,
  shapeType,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from 'react-native-dialog';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import RNPermissions from 'react-native-permissions';

const MainScreen = () => {
  const [mLat, setMLat] = useState(null);
  const [mLong, setMLong] = useState(null);
  const [markerColor, setMarkerColor] = useState('blue');
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [boundaryMarkers, setBoundaryMarkers] = useState([]);
  const [imageUri,setImageUri] = useState(null);
  const [showMapOptions, setShowMapOptions] = useState(false);
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [layer, setLayer] = useState('osm');
  const [searchInput, setSearchInput] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarHeight = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get('window').height * 1.3;
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  useEffect(() => {
    requestCameraPermission();
  }, []);
  useEffect(() => {
    requestPermission();
  }, []);
  useEffect(() => {
    requestStoragePermission();
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
        },
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

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Request',
          message: 'This app needs permission to access your photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Photos permission granted');
      } else {
        console.log('Photos permission denied');
      }
    } catch (error) {
      console.log('Error requesting photos permission:', error);
    }
  };
  
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs storage permission to save the screenshot.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.log('Error requesting storage permission:', error);
    }
  };

  const saveToDevice = async () => {
    try {
      const permission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!permission) {
        await requestStoragePermission();
        return;
      }

      const filePath = `${RNFS.PicturesDirectoryPath}/screenshot.png`; // File path in the Pictures directory
      await RNFS.copyFile(imageUri, filePath);
      console.log('Screenshot saved to:', filePath);
      Alert.alert('Screenshot saved to:', filePath);
    } catch (error) {
      console.log('Error saving screenshot:', error);
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
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const detectBoundary = () => {
    ref.current.capture().then(uri => {
      console.log("Captured Screenshot url ", uri);
    setImageUri(uri);
    setIsPreviewVisible(true);

    });
    console.log('detectBoundary');
  };


  const getContour = () => {
    const options ={
      url : imageUri,
      message : 'Captured Screenshot in DAC App'
    };
    Share.open(options);
    console.log('getContour');
  }

  const sendToServer = () => {
    const formData = new FormData();
    formData.append('screenshot', {
      uri: imageUri,
      type: 'image/png',
      name: 'screenshot.png',
    });
  
    fetch('http://192.168.43.22/BackendPythonServer/python.py', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('Image successfully sent to the server:', result);
      })
      .catch(error => {
        console.log('Error sending image to the server:', error);
      });
  };
  
  
  const handleMapLongPress = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedCoordinate({ latitude, longitude });
    detectBoundary(latitude, longitude);
    Alert.alert(
      'Marked Coordinates',
      `Latitude: ${latitude.toFixed(4)}\nLongitude: ${longitude.toFixed(4)}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setMLat(latitude);
            setMLong(longitude);
            <Marker coordinate={selectedCoordinate} />
            setMarkerColor('red');
          },
        },
      ]
    );
  };

  const handleSupportPress = () => {
    navigation.navigate('Support');
  };

  const handleMapOptionsPress = () => {
    setShowMapOptions(true);
  };

  const handleSearchPress = () => {
    setShowSearchBar(true);
    Animated.timing(searchBarHeight, {
      toValue: Dimensions.get('window').height * 0.4,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const handleProceed = () => {
    setLayer('satellite');
    setShowMapOptions(false);
    setShowSearchBar(false);
  }
  const handleSearchCancel = () => {
    setShowSearchBar(false);
  };

  const handleBackPress = () => {
    setShowAlert(true);
    return true;
  };
  const closePreview = () => {
    setIsPreviewVisible(false);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

const ref = useRef();
  return (
    <View style={styles.container}>
    <ViewShot ref = {ref} style={styles.mapContainer} options={{ fileName: "Screenshot", format: "jpg", quality: 0.9 }}>
      <View style={styles.mapContainer}>
        {layer === 'osm' ? (
          <MapView
            style={{ ...styles.map, height: windowHeight }}
            region={{
              latitude: 28.6139,
              longitude: 77.209,
              latitudeDelta: 20,
              longitudeDelta: 30,
            }}
            provider={undefined}
            mapType={'none'}
            showsUserLocation={true}
            showsTraffic={false}
            zoomEnabled={true}
            showsCompass={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            loadingEnabled={true}
            showsBuildings={true}
            onLongPress={handleMapLongPress}

          >
            <WMSTile
              urlTemplate={
                'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg'
              }
              zIndex={1}
              epsgSpec={'EPSG:90031'}
            />
            {selectedCoordinate && (
              <Marker coordinate={selectedCoordinate} pinColor="red" />
            )}
          </MapView>
        ) : layer === 'satellite' ? (
          <MapView
            style={{ ...styles.map, height: windowHeight }}
            region={{
              latitude: 28.6139,
              longitude: 77.209,
              latitudeDelta: 20,
              longitudeDelta: 30,
            }}
            provider={PROVIDER_GOOGLE}
            mapType={'satellite'}
            showsUserLocation={true}
            showsTraffic={false}
            zoomEnabled={true}
            showsCompass={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            loadingEnabled={true}
            showsBuildings={true}
            onLongPress={handleMapLongPress}
          >
          </MapView>
        ) : (
          <MapView
            style={{ ...styles.map, height: windowHeight }}
            region={{
              latitude: 28.6139,
              longitude: 77.209,
              latitudeDelta: 20,
              longitudeDelta: 30,
            }}
            provider={undefined}
            mapType={'none'}
            showsUserLocation={true}
            showsTraffic={false}
            zoomEnabled={true}
            showsCompass={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            loadingEnabled={true}
            showsBuildings={true}
            onLongPress={handleMapLongPress}
          >
            <UrlTile
              urlTemplate={'https://tile.openstreetmap.de/{z}/{x}/{y}.png'}
              zIndex={1}
              epsgSpec={'EPSG:90031'}
            />
          </MapView>
        )}
      </View>
</ViewShot>

      <View style={styles.container1}>
      {!showSearchBar && (layer === 'bhuvan' || layer === 'osm') && (
  <TouchableOpacity style={styles.searchIconContainer} onPress={handleSearchPress}>
    <Icon name="search" size={28} color="#333" />
  </TouchableOpacity>
)}

        {showSearchBar && (
          <View style={styles.overlayContainer}>
            <Animated.View style={[styles.searchBar, { height: searchBarHeight }]}>
              <Text style={styles.searchText}>Get Your Digital Address Code(DAC)</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.greenButton]} onPress = {handleProceed}>
                  <Text style={styles.buttonText1}>Proceed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.redButton]} onPress={handleSearchCancel}>
                  <Text style={styles.buttonText1}>Close</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        )}
      </View>
      {layer === 'satellite' && (
        <>
          <TouchableOpacity style={styles.IconContainer2} onPress={detectBoundary}>
            <Icon name="camera" size={30} color="black" />
          </TouchableOpacity>
          <Modal visible={isPreviewVisible} onRequestClose={closePreview}>
            <View style={styles.previewContainer}>
              {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
              <View style={styles.buttonContainer3}>
                <TouchableOpacity style={styles.button3} onPress={saveToDevice}>
                  <Text style={styles.buttonText}>Save to Device</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button3} onPress={sendToServer}>
                  <Text style={styles.buttonText}>Send to Server</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.closeIconContainer} onPress={closePreview}>
                <Icon name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}

      {layer === 'satellite' && (
        <TouchableOpacity style={styles.IconContainer3} onPress={getContour}>
          <Icon name="share" size={30} color="black" />
        </TouchableOpacity>
      )}


      <View style={styles.footer}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Your Current Location: {mLat !== null ? mLat.toFixed(4) : 28.6139},{' '}
            {mLong !== null ? mLong.toFixed(4) : 77.209}
          </Text>
          <Text style={[styles.footerText, styles.designText]}>
            Design and Develop by NRSC-ISRO
          </Text>
        </View>
        <TouchableOpacity
          style={styles.mapOptionsIcon}
          onPress={handleMapOptionsPress}>
          <Icon name="options" size={30} color="#333" />
        </TouchableOpacity>

      </View>
      <Dialog.Container visible={showMapOptions}>

        <Dialog.Title>Map Options</Dialog.Title>
        <Dialog.Description>Choose a map option:</Dialog.Description>
        <View style={styles.rowContainer}>
          <Dialog.Button
            label={
              <>
                <Image
                  source={require('../../../assets/images/default.png')}
                  style={styles.dialogImage}
                />
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
                <Image
                  source={require('../../../assets/images/osm.png')}
                  style={styles.dialogImage}
                />
                <Text style={styles.buttonText}>Bhuvan</Text>
              </>
            }
            onPress={() => {
              setLayer('osm');
              setShowMapOptions(false);
            }}
          />
        </View>
        <View style={styles.rowContainer}>
          <Dialog.Button
            label={
              <>
                <Image
                  source={require('../../../assets/images/satellite.png')}
                  style={styles.dialogImage}
                />
                <Text style={styles.buttonText}>Satellite</Text>
              </>
            }
            onPress={() => {
              setLayer('satellite');
              setShowMapOptions(false);
            }}
          />
          <Dialog.Button
            label="Close"
            onPress={() => {
              setShowMapOptions(false);
            }}
          />
        </View>
      </Dialog.Container>

      <Dialog.Container visible={showAlert}>
        <Dialog.Title>Are you sure you want to leave the app?</Dialog.Title>
        <Dialog.Button label="Yes" onPress={BackHandler.exitApp} />
        <Dialog.Button label="No" onPress={() => setShowAlert(false)} />
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

  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
    backgroundColor: 'red',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  IconContainer2: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 140,
    right: 20,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  IconContainer3: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 190,
    right: 20,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconContainer: {
    position: 'absolute',
    // top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    zIndex: 1,
    bottom: 20,
  },
  // overlayContainer: {
  //   ...StyleSheet.absoluteFillObject,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  searchBar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 2,
  },
  searchText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: '#82CD47',
  },
  redButton: {
    backgroundColor: '#FF1700',
  },
  buttonText1: {
    fontWeight: 'bold',
    color: 'white',
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  previewImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  buttonContainer3: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button3: {
    marginHorizontal: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    bottom : 40,
  },
  buttonText3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
  },
});

export default MainScreen;
