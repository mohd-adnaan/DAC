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
  ActivityIndicator,
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
  Geojson,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from 'react-native-dialog';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import RNPermissions from 'react-native-permissions';
import shpwrite from 'shp-write';
import axios from 'axios';
import polyline from '@mapbox/polyline';

const MainScreen = () => {
  const [mLat, setMLat] = useState(null);
  const [mLong, setMLong] = useState(null);
  const [markerColor, setMarkerColor] = useState(null);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [boundaryMarkers, setBoundaryMarkers] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [showMapOptions, setShowMapOptions] = useState(false);
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [layer, setLayer] = useState('osm');
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarHeight = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get('window').height * 1.3;
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [markedLocation, setMarkedLocation] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showMarkedLocationModal, setShowMarkedLocationModal] = useState(false);
  const [mapping, setMapping] = useState(false);
  const mapViewRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [contourCoordinates, setContourCoordinates] = useState([]);
  const [footerText, setFooterText] = useState('');
  const [showDACPopup, setShowDACPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);
  useEffect(() => {
    requestPermission();
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



  const getRandomColor = () => {
    const colors = ['blue', 'green', 'purple', 'orange', 'red'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setMLat(position.coords.latitude);
        setMLong(position.coords.longitude);
        const newColor = getRandomColor();
        setMarkerColor(newColor);
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const detectBoundary = async () => {
    try {
      setLoading(true);
      const uri = await captureRef(mapViewRef, {
        format: 'png',
        quality: 1,
      });
      console.log('Captured Screenshot URI:', uri);
      setImageUri(uri);
      setIsPreviewVisible(true);
    } catch (error) {
      console.log('Error capturing screenshot:', error);
    } finally {
      setLoading(false);
    }
  };
  const getShare = () => {
    const options = {
      url: imageUri,
      message: 'Captured Screenshot in DAC App'
    };
    Share.open(options);
    console.log('getShare');
  }

  const handleMapLongPress = event => {
    if (mapping) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setSelectedCoordinate({ latitude, longitude });
      setMarkedLocation({ latitude, longitude });
      const newColor = getRandomColor();
      setMarkerColor(newColor);
      setMapping(false);
      setShowMarkedLocationModal(true);
    }
  };
  const handleMapPress = event => {
    
      setSelectedLocations([]);
      if (mapping) {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        const markerColor = getRandomColor();
        setSelectedLocations(prevLocations => [
          ...prevLocations,
          { latitude, longitude, color: markerColor }, // Include color to differentiate markers
        ]);
        saveLocationToBackend(latitude, longitude);
      }
    };

    const saveLocationToBackend = async (latitude, longitude) => {
      try {
        const response = await axios.post('http://192.168.43.22/save_location.php', {
          latitude,
          longitude,
        });
        console.log('Location data saved:', response.data);
      } catch (error) {
        console.error('Error:Not Passed', error);
      }
    };

  const handleSupportPress = () => {
    navigation.navigate('Support');
  };

  const handleMapOptionsPress = () => {
    setShowMapOptions(true);
  };


  const handleBackPress = () => {
    setShowAlert(true);
    return true;
  };
  const closePreview = () => {
    setIsPreviewVisible(false);
    setShowMapOptions(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowMarkedLocationModal(false);
  };

  const handleOptionPress = () => {
    openModal();
  };
  const handleMark = () => {
    console.log('Mark');
    closeModal();
  };

  const handleMarkLocation = () => {
    closeModal();
    setMapping(true);
    setFooterText('LongPress on map to mark a new location');
    setTimeout(() => {
      setFooterText('');
    }, 2000);

  };
  const handleUpdateMarkedLocation = () => {
    closeModal();
    setMapping(true);
    setSelectedLocations([]);
    // setFooterText('LongPress on map to update marked location');
    // setTimeout(() => {
    //   setFooterText('');
    // }, 2000);
    if (markedLocation) {
      setBoundaryMarkers(prevMarkers => [...prevMarkers, markedLocation]);
      setMarkedLocation(null);
    }
  };
  const handleMapReset = () => {
    setMapping(false);
    setBoundaryMarkers([]);
    setSelectedLocations([]);
    setMarkedLocation(null);
  };

  const handleGetDAC = () => {

    if (markedLocation) {
      setShowDACPopup(true);
    } else {
      Alert.alert(
        'No Marked Location',
        'You have not marked any location on the Indian Map. Kindly mark a location to get the respective Digital Address Code.',
      );
    }
  };

  const getDAC = () => {
    console.log('getDAC');
    setLayer('satellite');
    setShowDACPopup(false);
  };


  const handleGetContour = () => {
    if (markedLocation) {
      const requestData = {
        latitude: markedLocation.latitude,
        longitude: markedLocation.longitude,
      };

      fetch('http://192.168.43.22:5000/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from backend:', data);
        })
        .catch((error) => {
          console.log('Error sending data to backend:', error);
        });
    } else {
      Alert.alert(
        'No Marked Location',
        'You have not marked any location on the Indian Map. Kindly mark a location to get the respective Contour detection around marked location.',
      );
    }
  };


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  const newColor = getRandomColor();
  const ref = useRef();
  return (

    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapViewRef}
          style={{ ...styles.map, height: windowHeight }}
          region={{
            latitude: 28.6139,
            longitude: 77.209,
            latitudeDelta: 20,
            longitudeDelta: 30,
          }}
          provider={layer === 'satellite' ? PROVIDER_GOOGLE : undefined}
          mapType={layer === 'satellite' ? 'satellite' : 'none'}
          showsUserLocation={true}
          zoomEnabled={true}
          onLongPress={handleMapPress}
        >
          {layer === 'osm' && (
            <WMSTile
              urlTemplate={
                'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg'
              }
              zIndex={1}
              epsgSpec={'EPSG:90031'}
            />
          )}
          {layer === 'bhuvan' && (
            <UrlTile
              urlTemplate={'https://tile.openstreetmap.de/{z}/{x}/{y}.png'}
              zIndex={1}
              epsgSpec={'EPSG:90031'}
            />
          )}
          {layer === 'esri' && (
            <UrlTile
              urlTemplate={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'}
              zIndex={1}
              epsgSpec={'EPSG:90031'}
            />
          )}
          {selectedLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              pinColor={location.color}
            />
          ))}
          {/* {selectedCoordinate && markedLocation && (
    <Marker coordinate={selectedCoordinate} pinColor={markerColor} />
  )} */}
          {selectedCoordinate && (
            <Marker coordinate={selectedCoordinate} pinColor={markerColor} />
          )}
          {contourCoordinates.map((coordinate, index) => (
            <Polyline
              key={index}
              coordinates={coordinate}
              strokeColor="red"
              strokeWidth={2}
            />
          ))}
        </MapView>

      </View>


      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      )}

      <TouchableOpacity style={styles.optionIconContainer} onPress={handleOptionPress}>
        <Icon name="location" size={28} color="#333" />
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.closeIconContainer3} onPress={closeModal}>
              <Icon name="ios-close-circle" color="gray" size={30} />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              {/* <TouchableOpacity style={styles.modalButton} onPress={handleMarkLocation}>
                <Text style={styles.modalButtonText}>  Mark New Location  </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleUpdateMarkedLocation}
              >
                <Text style={styles.modalButtonText}>  Mark New Location</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.modalButton} onPress={handleMark}>
                <Text style={styles.modalButtonText}>New Dummy</Text>
              </TouchableOpacity> */}
              <Text style={[styles.footerText, styles.designText]}>
                *LongPress on map to mark a new location
              </Text>
            </View>
          </View>
        </View>
      </Modal>



      <TouchableOpacity style={styles.IconContainer2} onPress={detectBoundary}>
        <Icon name="camera" size={30} color="black" />
      </TouchableOpacity>
      <Modal visible={isPreviewVisible} onRequestClose={closePreview}>
        <View style={styles.previewContainer}>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
          <View style={styles.buttonContainer3}>
            <TouchableOpacity style={styles.button3} onPress={saveToDevice}>
              <Text style={styles.buttonText}><Icon name="download" size={30} color="black" />Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={getShare}>
              <Text style={styles.buttonText}><Icon name="share" size={30} color="black" />Share</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeIconContainer} onPress={closePreview}>
            <Icon name="close" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.MapResetContainer} onPress={handleMapReset}>
        <Icon name="refresh" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mapOptionsIcon}
        onPress={handleMapOptionsPress}>
        <Icon name="layers" size={30} color="#333" />
      </TouchableOpacity>

      {/* <TouchableOpacity
          style={styles.getDACIcon}
          onPress={handleGetDAC}>
          <Icon name="ios-menu" size={30} color="#333" />
        </TouchableOpacity>  */}


      {showDACPopup && (
        <View style={styles.DACPopupContainer}>
          <View style={styles.DACPopup}>
            <TouchableOpacity style={styles.closeIconContainer} onPress={() => setShowDACPopup(false)}>
              <Icon name="ios-close-circle" color="gray" size={30} />
            </TouchableOpacity>
            <Text style={styles.DACPopupText}>Get your Digital Address Code (DAC) of the marked location</Text>
            <TouchableOpacity style={styles.DACPopupButton} onPress={getDAC}>
              <Text style={styles.DACPopupButtonText}>Get DAC</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* <TouchableOpacity
          style={styles.ContourIcon}
          onPress={handleGetContour}>
          <Icon name="ios-analytics" size={30} color="#333" />
        </TouchableOpacity>  */}

      <View style={styles.footer}>
        <View style={styles.locationContainer}>
          <Text style={styles.markedLocationText}>
            Current Location: {mLat !== null ? mLat.toFixed(4) : 28.6139}° N,{' '}
            {mLong !== null ? mLong.toFixed(4) : 77.209}° E
          </Text>
          {selectedLocations.length > 0 && (
  <View style={styles.line} />
)}
          {selectedLocations.map((location,index) => (
      <Text key={index} style={styles.markedLocationText}>
        Marked Location: {location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E
      </Text>
    ))}
          <Text style={[styles.footerText, styles.designText]}>
            GPS Accuracy : 600 meters
          </Text>
        </View>
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
      label={
        <>
          <Image
            source={require('../../../assets/images/esri.png')}
            style={styles.dialogImage}
          />
          <Text style={styles.buttonText}>Esri</Text>
        </>
      }
      onPress={() => {
        setLayer('esri');
        setShowMapOptions(false);
      }}
    />
  </View>
  <TouchableOpacity style={styles.closeIconContainer} onPress={closePreview}>
    <Icon name="close" size={40} color="black" />
  </TouchableOpacity>
</Dialog.Container>


      <Dialog.Container visible={showAlert}>
        <Dialog.Title>Are you sure you want to leave the app?</Dialog.Title>
        <Dialog.Button label="Yes   " onPress={BackHandler.exitApp} />
        <Dialog.Button label="    No" onPress={() => setShowAlert(false)} />
      </Dialog.Container>


    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Helvetica',
  },
  footerText2: {
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
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
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  designText: {
    fontSize: 12,
    marginTop: 5,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginVertical: 2,
  },
  mapOptionsIcon: {
    position: 'absolute',
    top: 60,
    right: 12,
    marginLeft: 10,
    backgroundColor: '#fff',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 4,
  },
  optionIconContainer: {
    position: 'absolute',
    top: 110,
    right: 14,
    marginLeft: 10,
    backgroundColor: '#fff',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 4,
  },
  MapResetContainer: {
    position: 'absolute',
    top: 156,
    right: 14,
    marginLeft: 10,
    backgroundColor: '#fff',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 4,
  },
  getDACIcon: {
    position: 'absolute',
    top: 247,
    right: 12,
    marginLeft: 10,
    backgroundColor: '#fff',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 4,
  },
  ContourIcon: {
    position: 'absolute',
    top: 295,
    right: 12,
    marginLeft: 10,
    backgroundColor: '#fff',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 4,
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

    top: 200,
    right: 12,
    marginLeft: 10,
    backgroundColor: '#fff',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 4,

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
  modalContentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
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

  buttonText1: {
    fontWeight: 'bold',
    color: 'white',
  },
  markedLocationText: {
    fontSize: 14,
   // fontWeight: 'bold',
    marginBottom: 10,

  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  previewImage: {
    width: "80%",
    height: "80%",
    borderRadius: 10,
    marginBottom: 20,
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
    backgroundColor: '#82CD47',
    borderRadius: 8,
  },
  buttonText3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalBox:
  {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    flexDirection: 'column',
    alignItems: "center",
    shadowColor: "#000",
  },

  closeIconContainer3: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  closeIconContainer2: {
    position: 'absolute',
    top: -22,
    right: -21,
  },
  modalContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  modalButton: {
    alignSelf: 'stretch',
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButtonIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#FE0000'
  },
  markedLocationModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  markedLocationModalBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  markedLocationText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  currentLocationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#82CD47',
  },
  markedLocationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  markedLocationButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#007bff',
  },
  getDacButton: {
    backgroundColor: '#007bff',
  },
  markedLocationButtonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  getDACIcon: {
    position: 'absolute',
    top: 250,
    right: 12,
    marginLeft: 10,
    backgroundColor: '#fff',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 4,
  },
  DACPopupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  DACPopup: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    top: -1,
    right: -1,
  },
  DACPopupText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  DACPopupButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  DACPopupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainScreen;