
// import React, { useEffect, useState, useRef } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Image,
//   Alert,
//   TextInput,
//   BackHandler,
//   Modal,
//   Button,
//   ActivityIndicator,
//   PanResponder,
//   Animated,
//   Easing,
// } from 'react-native';
// import MapView, {
//   UrlTile,
//   Marker,
//   WMSTile,
//   Polygon,
//   name,
//   location,
//   type,
//   landuseClass,
//   shapeType,
//   Geojson,
//   PROVIDER_GOOGLE,
// } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Dialog from 'react-native-dialog';
// import { captureRef } from 'react-native-view-shot';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';
// import * as Animatable from 'react-native-animatable';
// import RNPermissions from 'react-native-permissions';
// import shpwrite from 'shp-write';
// import axios from 'axios';
// import polyline from '@mapbox/polyline';

// const MainScreen = () => {
//   const [mLat, setMLat] = useState(null);
//   const [mLong, setMLong] = useState(null);
//   const [markerColor, setMarkerColor] = useState(null);
//   const [selectedCoordinate, setSelectedCoordinate] = useState(null);
//   const [boundaryMarkers, setBoundaryMarkers] = useState([]);
//   const [imageUri, setImageUri] = useState(null);
//   const [showMapOptions, setShowMapOptions] = useState(false);
//   const navigation = useNavigation();
//   const [showAlert, setShowAlert] = useState(false);
//   const [layer, setLayer] = useState('satellite');
//   const [selectedMapOption, setSelectedMapOption] = useState('satellite');
//   const windowHeight = Dimensions.get('window').height * 1.3;
//   const [isPreviewVisible, setIsPreviewVisible] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [markedLocation, setMarkedLocation] = useState(null);
//   const [selectedLocations, setSelectedLocations] = useState([]);
//   const [showMarkedLocationModal, setShowMarkedLocationModal] = useState(false);
//   const [mapping, setMapping] = useState(false);
//   const mapViewRef = useRef(null);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [contourCoordinates, setContourCoordinates] = useState([]);
//   const [footerText, setFooterText] = useState('');
//   const [showDACPopup, setShowDACPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [dacValue, setDacValue] = useState('');
//   const [mapPolygon, setMapPolygon] = useState(false);
//   const [shapeType, setShapeType] = useState('')
//   const [markers, setMarkers] = useState([]);
//   const [polygonCoordinates, setPolygonCoordinates] = useState([]);
//   const [PolygonMarkers, setPolygonMarkers] = useState([]);
//   const [drawpolygonCoordinates, setDrawPolygonCoordinates] = useState([]);
//   const [isDrawingEnabled, setDrawingEnabled] = useState(false);
//   const [coordinates, setCoordinates] = useState([]);
//   const [DAC, setDAC] = useState(false);
//   const [footerPosition, setFooterPosition] = useState(new Animated.Value(0));
//   const [footerVisible, setFooterVisible] = useState(true);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [showTooltipJamalpur, setShowTooltipJamalpur] = useState(false);
//   const [tip1, setTip1] = useState(false);
//   const [DACdataInvalid, setDACdataInvalid] = useState(false);
//   const [markNewLocation , setMarkNewLocation] = useState(false);
//   useEffect(() => {
//     requestCameraPermission();
//     fetchDataAndDisplayOnMap();
//   }, []);
//   useEffect(() => {
//     requestPermission();
//   }, []);
//   useEffect(() => {
//     drawPolygon();
//   }, [markers]);
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
//         },
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

//   const requestPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: 'Permission Request',
//           message: 'This app needs permission to access your photos.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Photos permission granted');
//       } else {
//         console.log('Photos permission denied');
//       }
//     } catch (error) {
//       console.log('Error requesting photos permission:', error);
//     }
//   };

//   const saveToDevice = async () => {
//     try {
//       const permission = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       );

//       if (!permission) {
//         await requestStoragePermission();
//         return;
//       }

//       const filePath = `${RNFS.PicturesDirectoryPath}/screenshot.png`; 
//       await RNFS.copyFile(imageUri, filePath);
//       console.log('Screenshot saved to:', filePath);
//       Alert.alert('Screenshot saved to:', filePath);
//     } catch (error) {
//       console.log('Error saving screenshot:', error);
//     }
//   };



//   const getRandomColor = () => {
//     const colors = ['#4285F4'];// '#34A853', '#FBBC05', '#EA4335',
//     const randomIndex = Math.floor(Math.random() * colors.length);
//     return colors[randomIndex];
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         console.log(position);
//         setMLat(position.coords.latitude);
//         setMLong(position.coords.longitude);
//         const newColor = getRandomColor();
//         setMarkerColor(newColor);
//       },
//       error => {
//         console.log(error.code, error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//     );
//   };

//   const detectBoundary = async () => {
//     try {
//       setLoading(true);
//       const uri = await captureRef(mapViewRef, {
//         format: 'png',
//         quality: 1,
//       });
//       console.log('Captured Screenshot URI:', uri);
//       setImageUri(uri);
//       setIsPreviewVisible(true);
//     } catch (error) {
//       console.log('Error capturing screenshot:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const getShare = () => {
//     const options = {
//       url: imageUri,
//       message: 'Captured Screenshot in DAC App'
//     };
//     Share.open(options);
//     console.log('getShare');
//   }

//   const handleMapLongPress = event => {
//     if (mapping) {
//       const { latitude, longitude } = event.nativeEvent.coordinate;
//       setSelectedCoordinate({ latitude, longitude });
//       setMarkedLocation({ latitude, longitude });
//       const newColor = getRandomColor();
//       setDAC(true);
//       setMarkerColor(newColor);
//       setMapping(false);
//       setShowMarkedLocationModal(true);
//     }
//   };


//   const handleMapPress = event => {
//     if (isDrawingEnabled) {
//       if (mapping && markers.length < 16) {
//         const { latitude, longitude } = event.nativeEvent.coordinate;
//         const markerColor = getRandomColor();
//         setSelectedLocations(prevLocations => [
//           ...prevLocations,
//           { latitude, longitude, color: markerColor },
//         ]);
//         setMarkers(prevMarkers => [
//           ...prevMarkers,
//           { latitude, longitude, color: markerColor },
//         ]);
//         saveLocationToBackend(latitude, longitude);
//         fetchDataAndDisplayOnMap();

//        // setFooterVisible(prevState => !prevState);
//       } else if (mapping && markers.length === 16) {
//         Alert.alert(
//           'Maximum Positions Reached',
//           'You have marked the maximum allowed positions (16).',
//         );
//       }
//     } else {
//       setSelectedLocations([]);
//       if (mapping) {
//         const { latitude, longitude } = event.nativeEvent.coordinate;
//         const markerColor = getRandomColor();
//         setSelectedLocations(prevLocations => [
//           ...prevLocations,
//           { latitude, longitude, color: markerColor },
//         ]);
//         setDAC(true);
//         saveLocationToBackend(latitude, longitude);
//         fetchDataAndDisplayOnMap();
//         setPolygonMarkers([]);
//         setDACdataInvalid(false);
//         //setFooterVisible(prevState => !prevState);
//       }
//     }
//   };

//   const fetchDataAndDisplayOnMap = async () => {
//     const data = await fetchDataFromBackend();
//     displayDataOnMap(data);
//   };

//   const fetchDataFromBackend = async () => {
//     try {
//       const response = await fetch('http://192.168.43.22/Integrate/getDAC.php');
//       const data = await response.json();

//       console.log('Raw Response:', data);

//       return data;
//     } catch (error) {
//       console.log('Error fetching data:', error);
//       return null;
//     }
//   };

//   const drawPolygon = () => {
//     if(DACdataInvalid){
//     if (markers.length >= 3) {
//       const coordinates = markers.map(marker => ({
//         latitude: marker.latitude,
//         longitude: marker.longitude,
//       }));
//       setDrawPolygonCoordinates(coordinates);
//     }
//    }
//     else {
//       setDrawPolygonCoordinates([]);
//     }
//   };

//   const displayDataOnMap = (data) => {
//     if (!data || !data.dac || !data.geom) {
//       console.log('Invalid data received from backend');
//       setDACdataInvalid(true);
//       console.log(DACdataInvalid);
//       return;
//     }
//     setDacValue(data.dac);
//     //  Alert.alert('DAC: ' + data.dac);

//     let coordinates;
//     try {
//       const parsedGeom = JSON.parse(data.geom);


//       if (parsedGeom.type === 'MultiPolygon' && Array.isArray(parsedGeom.coordinates)) {
//         coordinates = parsedGeom.coordinates[0][0];
//         getPolygon(coordinates);
//       } else {
//         throw new Error('Invalid geometry type or coordinates');
//       }
//     } catch (error) {
//       console.error('Error parsing coordinates:', error);
//       return;
//     }

//     if (!Array.isArray(coordinates) || coordinates.length === 0) {
//       console.error('Invalid coordinates received from backend');
//       return;
//     }
//     console.log(coordinates)
//     setMapPolygon(true);

//     const polygonCoordinates = coordinates.map((coordinatePair) => ({
//       latitude: coordinatePair[1],
//       longitude: coordinatePair[0],
//     }));
//     const markerColor = getRandomColor();
//     const newMarkers = polygonCoordinates.map(({ latitude, longitude }) => ({
//       latitude,
//       longitude,
//       color: markerColor,
//     }));

//     setPolygonMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);

//     console.log('Polygon Coordinates:', polygonCoordinates);
//     console.log('Poly length', polygonCoordinates.length);
//     console.log('PolygonMarkers:', PolygonMarkers);
//     setCoordinates(polygonCoordinates);
//   };


//   const getPolygon = (coordinates) => {
//     if (coordinates.length >= 3) {
//       const polygonCoordinate = coordinates.map(coordinate => ({
//         latitude: coordinate[1],
//         longitude: coordinate[0],
//       }));
//       setPolygonCoordinates(polygonCoordinate);
//       console.log('Polygon Coordinates:', polygonCoordinates);
//       console.log('Poly length', polygonCoordinates.length);
//     } else {
//       setPolygonCoordinates([]);
//       console.log('Polygon Coordinates:', polygonCoordinates);
//       console.log('Poly length', polygonCoordinates.length);
//     }
//   };

//   const saveLocationToBackend = async (latitude, longitude) => {
//     const formattedLatitude = latitude.toFixed(4);
//     const formattedLongitude = longitude.toFixed(4);

//     console.log(formattedLatitude, formattedLongitude);
//     try {
//       const requestOptions = {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           latitude: formattedLongitude,//86.487591 //,86.48406,86.4851,
//           longitude: formattedLatitude,// 25.3422 //25.319167,25.34389,25.3075,86.4925,
//         })
//       };
//       const response = await fetch('http://192.168.43.22/Integrate/save_location.php', requestOptions);
//       const responseData = await response.json();
//       console.log('Location data saved:', responseData);
//     } catch (error) {
//       console.error('Error: Not Passed', error);
//     }
//   };

//   const handleSupportPress = () => {
//     navigation.navigate('Support');
//   };

//   const handleMapOptionsPress = () => {
//     setShowMapOptions(true);
//   };


//   const handleBackPress = () => {
//     setShowAlert(true);
//     return true;
//   };
//   const closePreview = () => {
//     setIsPreviewVisible(false);
//     setShowMapOptions(false);
//   };
//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setShowMarkedLocationModal(false);
//   };

//   const handleOptionPress = () => {
//     openModal();
//   };
//   const handleMark = () => {
//     console.log('Mark');
//     closeModal();
//   };

//   const handleMarkLocation = () => {
//     closeModal();
//     setMapping(true);
//     setFooterText('LongPress on map to mark a new location');
//     setTimeout(() => {
//       setFooterText('');
//     }, 2000);

//   };
//   const handleUpdateMarkedLocation = () => {
//     closeModal();
//     setMapping(true);
//     setSelectedLocations([]);
//     setTip1(true);
//    // setFooterVisible(prevState => !prevState);
//     // setFooterText('LongPress on map to update marked location');
//     // setTimeout(() => {
//     //   setFooterText('');
//     // }, 2000);
//     if (markedLocation) {
//       setBoundaryMarkers(prevMarkers => [...prevMarkers, markedLocation]);
//       setMarkedLocation(null);
//     }
//   };
//   const gotoJamalpur = () => {
    
//     // Set the region to zoom into the marked location
//     const region = {
//       latitude: 25.30933,
//       longitude:86.49181,
//       latitudeDelta: 0.005,
//       longitudeDelta: 0.005,
//     };

//     // Update the map region
//     mapViewRef.current.animateToRegion(region, 3000); 
//   }
//   const handleMapReset = () => {
//     setMapping(false);
//     setBoundaryMarkers([]);
//     setDacValue(null);
//     setMapPolygon(false);
//     setMarkers([]);
//     setPolygonMarkers([]);
//     setDrawingEnabled(false);
//     setDAC(false);
//     setMarkedLocation(null);
//     setSelectedLocations([]);
//     setPolygonCoordinates([]);
//     setDrawPolygonCoordinates([]);
    
//     // region = {
//     //   latitude: 28.6139,
//     //   longitude: 77.209,
//     //   latitudeDelta: 20,
//     //   longitudeDelta: 30,
//     // }
//     // mapViewRef.current.animateToRegion(region, 2000);
//    // setFooterVisible(prevState => !prevState);
//     setTip1(false)
//   };

//   const handleBuildingCV = () => {
//     if (selectedLocations.length > 0) {
//       selectedLocations.map((location, index) => {
//         setShowDACPopup(true);
//        // setFooterVisible(prevState => !prevState);
//       });
//     } else {
//       Alert.alert(
//         'No Marked Location',
//         'You have not marked any location on the Indian Map. Kindly mark a location to get the respective Building CV and Contour.',
//       );
//     }
//   };

//   const getBuildingFootPrints = () => {
//     console.log('getBuildingFootPrints');
//     setLayer('satellite');
//     const requestData = {
//       latitude: selectedLocations.latitude,
//       longitude: selectedLocations.longitude,
//     };
//     fetch('http://192.168.43.22:5000/members', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Response from backend:', data);
//         setShowDACPopup(false);
//       })
//       .catch((error) => {
//         console.log('Error sending data to backend:', error);
//         setShowDACPopup(false);
//       });
//   };

//   const drawBuildingFootPrints = () => {
//     if (selectedLocations.length > 0) {
//       setShapeType('Polygon');
//       console.log(selectedLocations);
//       setLayer('satellite');
//       setDrawingEnabled(true);
//       setShowDACPopup(false);
//       setTip1(false);

//       // Get the latitude and longitude of the last marked location
//       const lastMarkedLocation = selectedLocations[selectedLocations.length - 1];
//       const { latitude, longitude } = lastMarkedLocation;

//       // Set the region to zoom into the marked location
//       const region = {
//         latitude,
//         longitude,
//         latitudeDelta: 0.001,
//         longitudeDelta: 0.001,
//       };

//       // Update the map region
//       mapViewRef.current.animateToRegion(region, 3000); // 1000ms duration for the animation
//     } else {
//       Alert.alert(
//         'No Marked Location',
//         'You have not marked any location on the Indian Map. Kindly mark a location to get the respective Contour detection around the marked location.',
//       );
//     }
//   };
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         const { dy } = gestureState;
//         if (dy > 0) {
//           setFooterPosition(new Animated.Value(dy));
//         }
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         const { dy } = gestureState;
//         if (dy > 100) {
//           // User dragged the footer down more than 100 units, close the footer
//           Animated.timing(footerPosition, {
//             toValue: 0,
//             duration: 200,
//             useNativeDriver: false,
//           }).start();
//         } else {
//           // User didn't drag the footer down enough, snap back to the original position
//           Animated.timing(footerPosition, {
//             toValue: 0,
//             duration: 200,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   const toggleFooter = () => {
//     setFooterVisible(prevState => !prevState);
//   };
//   useEffect(() => {
//     // Animate the footer position whenever footerVisible changes
//     Animated.timing(footerPosition, {
//       toValue: footerVisible ? 0 : windowHeight - 60,
//       duration: 200, 
//       easing: Easing.ease, 
//       useNativeDriver: false,
//     }).start();
//   }, [footerVisible, windowHeight, footerPosition]);


//   useEffect(() => {
//     if (selectedLocations.length > 0) {
//       setShowTooltip(true);
//       setTimeout(() => {
//         setShowTooltip(false);
//       }, 3000);
//     }
//   }, [selectedLocations]);
//   useEffect(() => {
//     setTimeout(() => {
//       setShowTooltipJamalpur(true);
//     }, 3000);
//   }, []);
//   useEffect(() => {
//     setTimeout(() => {
//       setMarkNewLocation(true);
//     }, 3000);
//   }, []);
//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', handleBackPress);
//     return () => {
//       BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
//     };
//   }, []);
//   const newColor = getRandomColor();
//   const ref = useRef();
//   return (

//     <View style={styles.container}>
//       <View style={styles.mapContainer}>
        
//         <MapView
//           ref={mapViewRef}
//           style={{ ...styles.map, height: windowHeight }}

//           region={{
//             latitude:  10.3705,//28.6139,
//             longitude: 83.8333,// 77.209,
//             latitudeDelta: 20,
//             longitudeDelta:30,
//           }}
//           provider={layer === 'satellite' ? PROVIDER_GOOGLE : undefined}
          
//           mapType={layer === 'satellite' ? 'satellite' : 'none'}
//           showsUserLocation={true}
//           zoomEnabled={true}
//           onLongPress={handleMapPress}
//         >
//           {layer === 'osm' && (
//             <WMSTile
//               urlTemplate={
//                 'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg'
//               }
//               zIndex={1}
//               epsgSpec={'EPSG:90031'}
//             />
//           )}
//           {layer === 'bhuvan' && (
//             <UrlTile
//               urlTemplate={'https://tile.openstreetmap.de/{z}/{x}/{y}.png'}
//               zIndex={1}
//               epsgSpec={'EPSG:90031'}
//             />
//           )}
//           {layer === 'esri' && (
//             <UrlTile
//               // urlTemplate={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'}
//               // urlTemplate = {'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
//               urlTemplate={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
//               zIndex={1}
//               epsgSpec={'EPSG:90031'}
//             />
//           )}
//           {layer === 'mapbox' && (
//             <UrlTile
//               urlTemplate={'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRuYWFuMDcwOSIsImEiOiJjbGo3azM4aDQwazlrM2ZxcHBvaHR4azBhIn0.y10hp3ht1p4vtHiS2_DdBw'}
//               zIndex={1}
//               epsgSpec={'EPSG:90031'}
//             />
//           )}
//           {selectedLocations.map((location, index) => (
//             <Marker
//               key={index}
//               coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//               pinColor={location.color}
//             />
//           ))}
//           {/* {selectedCoordinate && markedLocation && (
//     <Marker coordinate={selectedCoordinate} pinColor={markerColor} />
//   )} */}
//           {selectedCoordinate && (
//             <Marker coordinate={selectedCoordinate} pinColor={markerColor}>
//               <Callout>
//                 <Text>Selected location: {selectedCoordinate.latitude.toFixed(4)}° N, {selectedCoordinate.longitude.toFixed(4)}° E</Text>
//               </Callout>
//             </Marker>
//           )}


//           {isDrawingEnabled && markers.map((marker, index) => (
//             <Marker
//               key={index}
//               coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
//               pinColor={marker.color}
//             />
//           ))}

//           {DAC && PolygonMarkers.map((PolygonMarker, index) => (
//             <Marker
//               key={index}
//               coordinate={{ latitude: PolygonMarker.latitude, longitude: PolygonMarker.longitude }}
//               color={PolygonMarker.color}
//             />
            
//           ))}
//           {polygonCoordinates.length >= 3 &&
//             <Polygon
//               coordinates={polygonCoordinates}
//               strokeWidth={2}
//               fillColor="rgba(0, 0, 255,0.5)"
//               zIndex={5}
//               fillOpacity={0.35}

//             />
//           }
         

//           {drawpolygonCoordinates.length >= 3 && (
//             <Polygon
//               coordinates={drawpolygonCoordinates}
//               strokeWidth={2}
//               fillColor="rgba(255, 10, 10,0.5)"
//               zIndex={5}
//               fillOpacity={0.35}
//             />
//           )}
//         </MapView>

//       </View>
// {
//   markNewLocation && (
//     <Animatable.View
//           style={styles.tooltipContainerLocation}
//           animation="fadeIn"
//           duration={3000}
//           iterationCount={1}
//           onAnimationEnd={() => setMarkNewLocation(false)}
//         >
//           <Text style={styles.tooltipText}>
//             Mark New Location
//             <Icon name="ios-arrow-forward" size={30} color="white" />
//           </Text>
//         </Animatable.View>
//   )
// }
      

//       {loading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#007bff" />
//           <Text style={styles.loadingText}>Please wait...</Text>
//         </View>
//       )}

//       <TouchableOpacity style={styles.optionIconContainer} onPress={handleOptionPress}>
//         <Icon name="ios-pin" size={28} color="#333" />
//       </TouchableOpacity>

//       <Modal visible={showModal} transparent={true} onRequestClose={closeModal}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalBox}>
//             <TouchableOpacity style={styles.closeIconContainer3} onPress={closeModal}>
//               <Icon name="ios-close-circle" color="gray" size={30} />
//             </TouchableOpacity>
//             <View style={styles.modalContent}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={handleUpdateMarkedLocation}
//               >
//                 <Text style={styles.modalButtonText}>  Mark New Location</Text>
//               </TouchableOpacity>


//               <Text style={[styles.footerText, styles.designText]}>
//                 *LongPress on map to mark a new location
//               </Text>
//             </View>
//           </View>
//         </View>
//       </Modal>



//       <TouchableOpacity style={styles.IconContainer2} onPress={detectBoundary}>
//         <Icon name="camera" size={30} color="black" />
//       </TouchableOpacity>
//       <Modal visible={isPreviewVisible} onRequestClose={closePreview}>
//         <View style={styles.previewContainer}>
//           {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
//           <View style={styles.buttonContainer3}>
//             <TouchableOpacity style={styles.button3} onPress={saveToDevice}>
//               <Text style={styles.buttonText}><Icon name="download" size={30} color="black" />Save</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button3} onPress={getShare}>
//               <Text style={styles.buttonText}><Icon name="share" size={30} color="black" />Share</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity style={styles.closeIconContainer} onPress={closePreview}>
//             <Icon name="close" size={40} color="black" />
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       <TouchableOpacity style={styles.MapResetContainer} onPress={handleMapReset}>
//         <Icon name="refresh" size={28} color="#333" />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.mapOptionsIcon}
//         onPress={handleMapOptionsPress}>
//         <Icon name="layers" size={30} color="#333" />

//       </TouchableOpacity>

      
//       {tip1 && showTooltip && DACdataInvalid && (
//         <Animatable.View
//           style={styles.tooltipContainer}
//           animation="fadeIn"
//           duration={3000}
//           iterationCount={1}
//           onAnimationEnd={() => setShowTooltip(false)}
//         >
//           <Text style={styles.tooltipText}>Mark Building Footprints<Icon name="ios-arrow-forward" size={30} color="white" />
//           </Text>
//         </Animatable.View>
//       )}

//       {DAC && showTooltipJamalpur && (
//         <Animatable.View
//           style={styles.tooltipContainerJamalpur}
//           animation="fadeIn"
//           duration={3000}
//           iterationCount={1}
//           onAnimationEnd={() => setShowTooltipJamalpur(false)}
//         >
//           <Text style={styles.tooltipText}>
//             Go to JamalPur
//             <Icon name="ios-arrow-forward" size={30} color="white" />
//           </Text>
//         </Animatable.View>
//       )}

//       <TouchableOpacity
//         style={styles.getDACIcon}
//         onPress={handleBuildingCV}>
//         <Icon name="pencil-outline" size={30} color="#333" />
//       </TouchableOpacity>


//       <TouchableOpacity
//         style={styles.gotoJamalpurIcon}
//         onPress={gotoJamalpur}>
//         <Icon name="ios-arrow-up" size={30} color="#333" />
//       </TouchableOpacity>

//       {showDACPopup && (
//         <View style={styles.DACPopupContainer}>
//           <View style={styles.DACPopup}>
//             <TouchableOpacity style={styles.closeIconContainer} onPress={() => setShowDACPopup(false)}>
//               <Icon name="ios-close-circle" color="gray" size={30} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.DACPopupButton} onPress={drawBuildingFootPrints}>
//               <Text style={styles.DACPopupButtonText}>Draw Building Footprints</Text>
//             </TouchableOpacity>
//             <Text style={[styles.footerText, styles.designText]}>
//               *LongPress on map to draw boundary/Contour around building precisely
//             </Text>
//             <TouchableOpacity style={styles.DACPopupButton} onPress={getBuildingFootPrints}>
//               <Text style={styles.DACPopupButtonText}>Get Building Footprints</Text>
//             </TouchableOpacity>
//             <Text style={[styles.footerText, styles.designText]}>
//               *Generate boundary automatically
//             </Text>
//           </View>
//         </View>
//       )}

//       <View style={styles.footer}>
//         <View style={styles.locationContainer}>
//           <Animated.View style={[styles.footerContent, { transform: [{ translateY: footerPosition }] }]}>
//             <Text style={styles.markedLocationText}>
//               Current Location: {mLat !== null ? mLat.toFixed(4) : 28.6139}° N,{' '}
//               {mLong !== null ? mLong.toFixed(4) : 77.209}° E
//             </Text>
//             {selectedLocations.length > 0 && (
//               <>
//                 <View style={styles.line} />
//                 <Text style={styles.markedLocationText}>
//                   Marked Location: {selectedLocations[selectedLocations.length - 1].latitude.toFixed(4)}° N,{' '}
//                   {selectedLocations[selectedLocations.length - 1].longitude.toFixed(4)}° E
//                 </Text>
//               </>
//             )}
//             <View style={styles.line} />

//             {DAC && (
//               <Text style={styles.markedLocationText}>
//                 {DACdataInvalid ? 'Your DAC: NULL' : `Your DAC: ${dacValue}`}
//               </Text>
//             )}

//             <Text style={[styles.footerText, styles.designText]}>GPS Accuracy: 700 meters</Text>
//           </Animated.View>
//         </View>
//         <TouchableOpacity style={styles.down} onPress={toggleFooter}>
//           <Icon name={footerVisible ? 'ios-arrow-down' : 'ios-arrow-up'} size={40} color="black" />
//         </TouchableOpacity>
//       </View>


//       <Dialog.Container visible={showMapOptions}>
//         <Dialog.Title>Map Options</Dialog.Title>
//         <Dialog.Description>Choose a map option:</Dialog.Description>
//         <View style={styles.rowContainer}>
//           <TouchableOpacity
//             style={[styles.mapOptionButton, selectedMapOption === 'osm' && styles.selectedMapOptionButton]}
//             onPress={() => {
//               setLayer('osm');
//               setSelectedMapOption('osm'); // Update the selected map option
//               setShowMapOptions(false);
//             }}
//           >
//             <Image
//               source={require('../../../assets/images/osm.png')}
//               style={styles.dialogImage}
//             />
//             <Text style={styles.buttonText}>Bhuvan</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.mapOptionButton, selectedMapOption === 'bhuvan' && styles.selectedMapOptionButton]}
//             onPress={() => {
//               setLayer('bhuvan');
//               setSelectedMapOption('bhuvan'); // Update the selected map option
//               setShowMapOptions(false);
//             }}
//           >
//             <Image
//               source={require('../../../assets/images/default.png')}
//               style={styles.dialogImage}
//             />
//             <Text style={styles.buttonText}>OSM</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.rowContainer}>
//           <TouchableOpacity
//             style={[styles.mapOptionButton, selectedMapOption === 'satellite' && styles.selectedMapOptionButton]}
//             onPress={() => {
//               setLayer('satellite');
//               setSelectedMapOption('satellite'); // Update the selected map option
//               setShowMapOptions(false);
//             }}
//           >
//             <Image
//               source={require('../../../assets/images/satellite.png')}
//               style={styles.dialogImage}
//             />
//             <Text style={styles.buttonText}>Google</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.mapOptionButton, selectedMapOption === 'esri' && styles.selectedMapOptionButton]}
//             onPress={() => {
//               setLayer('esri');
//               setSelectedMapOption('esri'); // Update the selected map option
//               setShowMapOptions(false);
//             }}
//           >
//             <Image
//               source={require('../../../assets/images/esri_satellite.png')}
//               style={styles.dialogImage}
//             />
//             <Text style={styles.buttonText}>Esri</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//           style={[styles.mapOptionButton, selectedMapOption === 'mapbox' && styles.selectedMapOptionButton]}
//           onPress={() => {
//             setLayer('mapbox');
//             setSelectedMapOption('mapbox'); // Update the selected map option
//             setShowMapOptions(false);
//           }}
//         >
//           <Image
//             source={require('../../../assets/images/mapbox.png')}
//             style={styles.dialogImage}
//           />
//           <Text style={styles.buttonText}>Mapbox</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.closeIconContainer} onPress={closePreview}>
//           <Icon name="close" size={40} color="black" />
//         </TouchableOpacity>
//       </Dialog.Container>


//       <Dialog.Container visible={showAlert}>
//         <Dialog.Title>Are you sure you want to leave the app?</Dialog.Title>
//         <Dialog.Button label="Yes   " onPress={BackHandler.exitApp} />
//         <Dialog.Button label="    No" onPress={() => setShowAlert(false)} />
//       </Dialog.Container>


//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     fontFamily: 'Helvetica',
//   },
//   footerText2: {
//     backgroundColor: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//     color: 'black',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#E4EAF7',
//   },
//   mapContainer: {
//     flex: 1.2,
//   },
//   map: {
//     width: '100%',
//     height: '120%',
//   },
//   // footer: {
//   //   backgroundColor: '#9AC5F4',
//   //   paddingVertical: 10,
//   //   paddingHorizontal: 20,
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-between',
//   //   alignItems: 'center',
//   // },
//   footer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     justifyContent: 'center', // Center the icon vertically
//     alignItems: 'flex-end', // Align the icon to the right-hand side
//   },
//   footerContent: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   down: {
//     position: 'absolute',
//     bottom: 2,
//     right: 2,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.5)', // Updated to use RGBA color for 50% opacity
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },

//   locationContainer: {
//     flex: 1,
//   },
//   locationText: {
//     fontSize: 15,
//     color: '#333',
//     marginBottom: 5,
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#666',
//   },
//   designText: {
//     fontSize: 12,
//     marginTop: 5,
//   },
//   line: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     marginVertical: 2,
//   },
//   mapOptionsIcon: {
//     position: 'absolute',
//     top: 60,
//     right: 12,
//     marginLeft: 10,
//     backgroundColor: '#fff',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 4,
//     padding: 4,
//   },
//   optionIconContainer: {
//     position: 'absolute',
//     top: 110,
//     right: 14,
//     marginLeft: 10,
//     backgroundColor: '#fff',
//     backgroundColor: '#FFFFFF',
//     padding: 4,
//     borderRadius: 4,
//   },
//   MapResetContainer: {
//     position: 'absolute',
//     top: 156,
//     right: 14,
//     marginLeft: 10,
//     backgroundColor: '#fff',
//     backgroundColor: '#FFFFFF',
//     padding: 4,
//     borderRadius: 4,
//   },
//   getDACIcon: {
//     position: 'absolute',
//     top: 200,
//     right: 12,
//     marginLeft: 10,
//     backgroundColor: '#fff',
//     backgroundColor: '#FFFFFF',
//     padding: 4,
//     borderRadius: 4,
//   },
//   ContourIcon: {
//     position: 'absolute',
//     top: 295,
//     right: 12,
//     marginLeft: 10,
//     backgroundColor: '#fff',
//     backgroundColor: '#FFFFFF',
//     padding: 4,
//     borderRadius: 4,
//   },
//   dialogImage: {
//     width: 60,
//     height: 60,
//     marginRight: 10,
//   },

//   buttonContainer: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginLeft: 8,
//     backgroundColor: 'red',
//   },
//   buttonText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: 'black',
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },

//   IconContainer2: {
//     position: 'absolute',
//     top: 300,
//     right: 12,
//     marginLeft: 10,
//     backgroundColor: '#fff',
//     backgroundColor: '#FFFFFF',
//     padding: 4,
//     borderRadius: 4,

//   },
//   IconContainer3: {
//     position: 'absolute',
//     backgroundColor: '#fff',
//     bottom: 190,
//     right: 20,
//     backgroundColor: 'white',
//     padding: 5,
//     borderRadius: 5,
//   },
//   container1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchIconContainer: {
//     position: 'absolute',
//     // top: 20,
//     right: 20,
//     backgroundColor: 'white',
//     borderRadius: 5,
//     padding: 5,
//     zIndex: 1,
//     bottom: 20,
//   },
//   modalContentText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//     justifyContent: 'space-between',
//   },
//   button: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//     marginHorizontal: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   // down:{
//   //   alignItems: 'center',
//   // },
//   buttonText1: {
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   markedLocationText: {
//     fontSize: 14,
//     // fontWeight: 'bold',
//     marginBottom: 10,

//   },
//   previewContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F8F8F8',
//     borderRadius: 10,
//     margin: 20,
//     padding: 20,
//   },
//   previewImage: {
//     width: "80%",
//     height: "80%",
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   buttonContainer3: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   button3: {
//     marginHorizontal: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: '#82CD47',
//     borderRadius: 8,
//   },
//   buttonText3: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   closeIconContainer: {
//     position: 'absolute',
//     top: 10,
//     right: 5,
//     zIndex: 1,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)'
//   },
//   modalBox:
//   {
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 5,
//     flexDirection: 'column',
//     alignItems: "center",
//     shadowColor: "#000",
//   },

//   closeIconContainer3: {
//     position: 'absolute',
//     top: 2,
//     right: 2,
//   },
//   closeIconContainer2: {
//     position: 'absolute',
//     top: -22,
//     right: -21,
//   },
//   modalContent: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   modalButton: {
//     alignSelf: 'stretch',
//     backgroundColor: '#007bff',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   closeButtonIcon: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     backgroundColor: '#FE0000'
//   },
//   markedLocationModalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   markedLocationModalBox: {
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 20,
//   },
//   markedLocationText: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   currentLocationText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#82CD47',
//   },
//   markedLocationButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   markedLocationButton: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 5,
//     marginHorizontal: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   updateButton: {
//     backgroundColor: '#007bff',
//   },
//   getDacButton: {
//     backgroundColor: '#007bff',
//   },
//   markedLocationButtonText: {
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   getDACIcon: {
//     position: 'absolute',
//     top: 200,
//     right: 12,
//     marginLeft: 10,
//     backgroundColor: '#fff',
//     backgroundColor: '#FFFFFF',
//     padding: 4,
//     borderRadius: 4,
//   },
//   gotoJamalpurIcon:{
//     position: 'absolute',
//     top: 250,
//     right: 12,
//     marginLeft: 10,
//     backgroundColor: '#fff',
//     backgroundColor: '#FFFFFF',
//     padding: 4,
//     borderRadius: 4,
//   },
//   DACPopupContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     //backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     marginBottom: 60,
//   },
//   DACPopup: {
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//     alignItems: 'center',
//   },
//   closeIconContainer: {
//     position: 'absolute',
//     top: -1,
//     right: -1,
//   },
//   DACPopupText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: 'black',
//   },
//   DACPopupButton: {
//     backgroundColor: '#007bff',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginVertical: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   DACPopupButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },

//   // Tooltip styles
//   tooltipContainer: {
//     position: 'absolute',
//     top: 200, 
//     // left: '50%',
//     right: 50,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     backgroundColor: '#333',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tooltipContainerJamalpur: {
//     position: 'absolute',
//     top: 250, 
//     // left: '50%',
//     right: 50,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     backgroundColor: '#333',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tooltipContainerLocation:{
//     position: 'absolute',
//     top: 110, 
//     // left: '50%',
//     right: 50,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     backgroundColor: '#333',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   tooltipText: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   mapOptionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderWidth: 3,
//     borderColor: 'transparent', 
//   },

//   selectedMapOptionButton: {
//     borderColor: '#007bff',
//   },
// });


// export default MainScreen;




// //----------------------------------------------------------------------------------------------------------------------------------------------







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
  BackHandler,
  Modal,
  Button,
  ActivityIndicator,
  PanResponder,
  Animated,
  Easing,
} from 'react-native';
import MapView, {
  UrlTile,
  Marker,
  WMSTile,
  Polygon,
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
import * as Animatable from 'react-native-animatable';
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
  const [layer, setLayer] = useState('satellite');
  const [selectedMapOption, setSelectedMapOption] = useState('satellite');
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
  const [dacValue, setDacValue] = useState('');
  const [mapPolygon, setMapPolygon] = useState(false);
  const [shapeType, setShapeType] = useState('')
  const [markers, setMarkers] = useState([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [PolygonMarkers, setPolygonMarkers] = useState([]);
  const [drawpolygonCoordinates, setDrawPolygonCoordinates] = useState([]);
  const [isDrawingEnabled, setDrawingEnabled] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [DAC, setDAC] = useState(false);
  const [footerPosition, setFooterPosition] = useState(new Animated.Value(0));
  const [footerVisible, setFooterVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipJamalpur, setShowTooltipJamalpur] = useState(false);
  const [tip1, setTip1] = useState(false);
  const [DACdataInvalid, setDACdataInvalid] = useState(false);
  const [markNewLocation , setMarkNewLocation] = useState(false);
  useEffect(() => {
    requestCameraPermission();
    fetchDataAndDisplayOnMap();
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

      const filePath = `${RNFS.PicturesDirectoryPath}/screenshot.png`; 
      await RNFS.copyFile(imageUri, filePath);
      console.log('Screenshot saved to:', filePath);
      Alert.alert('Screenshot saved to:', filePath);
    } catch (error) {
      console.log('Error saving screenshot:', error);
    }
  };



  const getRandomColor = () => {
    const colors = ['#4285F4'];// '#34A853', '#FBBC05', '#EA4335',
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
      setDAC(true);
      setMarkerColor(newColor);
      setMapping(false);
      setShowMarkedLocationModal(true);
    }
  };


  const handleMapPress = event => {
    if (isDrawingEnabled) {
      if (mapping && markers.length < 16) {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        const markerColor = getRandomColor();
        setSelectedLocations(prevLocations => [
          ...prevLocations,
          { latitude, longitude, color: markerColor },
        ]);
        setMarkers(prevMarkers => [
          ...prevMarkers,
          { latitude, longitude, color: markerColor },
        ]);
        saveLocationToBackend(latitude, longitude);
        fetchDataAndDisplayOnMap();

       // setFooterVisible(prevState => !prevState);
      } else if (mapping && markers.length === 16) {
        Alert.alert(
          'Maximum Positions Reached',
          'You have marked the maximum allowed positions (16).',
        );
      }
    } else {
      setSelectedLocations([]);
      if (mapping) {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        const markerColor = getRandomColor();
        setSelectedLocations(prevLocations => [
          ...prevLocations,
          { latitude, longitude, color: markerColor },
        ]);
        setDAC(true);
        saveLocationToBackend(latitude, longitude);
        fetchDataAndDisplayOnMap();
        setPolygonMarkers([]);
        setDACdataInvalid(false);
        //setFooterVisible(prevState => !prevState);
      }
    }
  };

  const fetchDataAndDisplayOnMap = async () => {
    const data = await fetchDataFromBackend();
    displayDataOnMap(data);
  };

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('http://192.168.43.22/Integrate/getDAC.php');
      const data = await response.json();

      console.log('Raw Response:', data);

      return data;
    } catch (error) {
      console.log('Error fetching data:', error);
      return null;
    }
  };

  const drawPolygon = () => {
    if(DACdataInvalid){
    if (markers.length >= 3) {
      const coordinates = markers.map(marker => ({
        latitude: marker.latitude,
        longitude: marker.longitude,
      }));
      setDrawPolygonCoordinates(coordinates);
    }
   }
    else {
      setDrawPolygonCoordinates([]);
    }
  };

  const displayDataOnMap = (data) => {
    if (!data || !data.dac || !data.geom) {
      console.log('Invalid data received from backend');
      setDACdataInvalid(true);
      console.log(DACdataInvalid);
      return;
    }
    setDacValue(data.dac);
    //  Alert.alert('DAC: ' + data.dac);

    let coordinates;
    try {
      const parsedGeom = JSON.parse(data.geom);


      if (parsedGeom.type === 'MultiPolygon' && Array.isArray(parsedGeom.coordinates)) {
        coordinates = parsedGeom.coordinates[0][0];
        getPolygon(coordinates);
      } else {
        throw new Error('Invalid geometry type or coordinates');
      }
    } catch (error) {
      console.error('Error parsing coordinates:', error);
      return;
    }

    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      console.error('Invalid coordinates received from backend');
      return;
    }
    console.log(coordinates)
    setMapPolygon(true);

    const polygonCoordinates = coordinates.map((coordinatePair) => ({
      latitude: coordinatePair[1],
      longitude: coordinatePair[0],
    }));
    const markerColor = getRandomColor();
    const newMarkers = polygonCoordinates.map(({ latitude, longitude }) => ({
      latitude,
      longitude,
      color: markerColor,
    }));

    setPolygonMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);

    console.log('Polygon Coordinates:', polygonCoordinates);
    console.log('Poly length', polygonCoordinates.length);
    console.log('PolygonMarkers:', PolygonMarkers);
    setCoordinates(polygonCoordinates);
  };


  const getPolygon = (coordinates) => {
    if (coordinates.length >= 3) {
      const polygonCoordinate = coordinates.map(coordinate => ({
        latitude: coordinate[1],
        longitude: coordinate[0],
      }));
      setPolygonCoordinates(polygonCoordinate);
      console.log('Polygon Coordinates:', polygonCoordinates);
      console.log('Poly length', polygonCoordinates.length);
    } else {
      setPolygonCoordinates([]);
      console.log('Polygon Coordinates:', polygonCoordinates);
      console.log('Poly length', polygonCoordinates.length);
    }
  };

  const saveLocationToBackend = async (latitude, longitude) => {
    const formattedLatitude = latitude.toFixed(4);
    const formattedLongitude = longitude.toFixed(4);

    console.log(formattedLatitude, formattedLongitude);
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          latitude: formattedLongitude,//86.487591 //,86.48406,86.4851,
          longitude: formattedLatitude,// 25.3422 //25.319167,25.34389,25.3075,86.4925,
        })
      };
      const response = await fetch('http://192.168.43.22/Integrate/save_location.php', requestOptions);
      const responseData = await response.json();
      console.log('Location data saved:', responseData);
    } catch (error) {
      console.error('Error: Not Passed', error);
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
    setTip1(true);
   // setFooterVisible(prevState => !prevState);
    // setFooterText('LongPress on map to update marked location');
    // setTimeout(() => {
    //   setFooterText('');
    // }, 2000);
    if (markedLocation) {
      setBoundaryMarkers(prevMarkers => [...prevMarkers, markedLocation]);
      setMarkedLocation(null);
    }
  };
  const gotoJamalpur = () => {
    
    // Set the region to zoom into the marked location
    const region = {
      latitude: 25.30933,
      longitude:86.49181,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    // Update the map region
    mapViewRef.current.animateToRegion(region, 3000); 
  }
  const handleMapReset = () => {
    setMapping(false);
    setBoundaryMarkers([]);
    setDacValue(null);
    setMapPolygon(false);
    setMarkers([]);
    setPolygonMarkers([]);
    setDrawingEnabled(false);
    setDAC(false);
    setMarkedLocation(null);
    setSelectedLocations([]);
    setPolygonCoordinates([]);
    setDrawPolygonCoordinates([]);
    
    // region = {
    //   latitude: 28.6139,
    //   longitude: 77.209,
    //   latitudeDelta: 20,
    //   longitudeDelta: 30,
    // }
    // mapViewRef.current.animateToRegion(region, 2000);
   // setFooterVisible(prevState => !prevState);
    setTip1(false)
  };

  const handleBuildingCV = () => {
    if (selectedLocations.length > 0) {
      selectedLocations.map((location, index) => {
        setShowDACPopup(true);
       // setFooterVisible(prevState => !prevState);
      });
    } else {
      Alert.alert(
        'No Marked Location',
        'You have not marked any location on the Indian Map. Kindly mark a location to get the respective Building CV and Contour.',
      );
    }
  };

  const getBuildingFootPrints = () => {
    console.log('getBuildingFootPrints');
    setLayer('satellite');
    const requestData = {
      latitude: selectedLocations.latitude,
      longitude: selectedLocations.longitude,
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
        setShowDACPopup(false);
      })
      .catch((error) => {
        console.log('Error sending data to backend:', error);
        setShowDACPopup(false);
      });
  };

  const drawBuildingFootPrints = () => {
    if (selectedLocations.length > 0) {
      setShapeType('Polygon');
      console.log(selectedLocations);
      setLayer('satellite');
      setDrawingEnabled(true);
      setShowDACPopup(false);
      setTip1(false);
      setMarkedLocation(null);
      setSelectedLocations([]);

      // // Get the latitude and longitude of the last marked location
      // const lastMarkedLocation = selectedLocations[selectedLocations.length - 1];
      // const { latitude, longitude } = lastMarkedLocation;

      // // Set the region to zoom into the marked location
      // const region = {
      //   latitude,
      //   longitude,
      //   latitudeDelta: 0.001,
      //   longitudeDelta: 0.001,
      // };

      // // Update the map region
      // mapViewRef.current.animateToRegion(region, 3000); // 1000ms duration for the animation
    } else {
      Alert.alert(
        'No Marked Location',
        'You have not marked any location on the Indian Map. Kindly mark a location to get the respective Contour detection around the marked location.',
      );
    }
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        if (dy > 0) {
          setFooterPosition(new Animated.Value(dy));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy } = gestureState;
        if (dy > 100) {
          // User dragged the footer down more than 100 units, close the footer
          Animated.timing(footerPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else {
          // User didn't drag the footer down enough, snap back to the original position
          Animated.timing(footerPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const toggleFooter = () => {
    setFooterVisible(prevState => !prevState);
  };
  useEffect(() => {
    // Animate the footer position whenever footerVisible changes
    Animated.timing(footerPosition, {
      toValue: footerVisible ? 0 : windowHeight - 60,
      duration: 200, 
      easing: Easing.ease, 
      useNativeDriver: false,
    }).start();
  }, [footerVisible, windowHeight, footerPosition]);


  useEffect(() => {
    if (selectedLocations.length > 0) {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    }
  }, [selectedLocations]);
  useEffect(() => {
    setTimeout(() => {
      setShowTooltipJamalpur(true);
    }, 3000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setMarkNewLocation(true);
    }, 3000);
  }, []);
  useEffect(() => {
    drawPolygon();
  }, [markers]);


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
            latitude:  10.3705,//28.6139,
            longitude: 83.8333,// 77.209,
            latitudeDelta: 20,
            longitudeDelta:30,
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
              // urlTemplate={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'}
              // urlTemplate = {'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
              urlTemplate={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
              zIndex={1}
              epsgSpec={'EPSG:90031'}
            />
          )}
          {layer === 'mapbox' && (
            <UrlTile
              urlTemplate={'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRuYWFuMDcwOSIsImEiOiJjbGo3azM4aDQwazlrM2ZxcHBvaHR4azBhIn0.y10hp3ht1p4vtHiS2_DdBw'}
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
            <Marker coordinate={selectedCoordinate} pinColor={markerColor}>
              <Callout>
                <Text>Selected location: {selectedCoordinate.latitude.toFixed(4)}° N, {selectedCoordinate.longitude.toFixed(4)}° E</Text>
              </Callout>
            </Marker>
          )}


          {isDrawingEnabled && markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              pinColor={marker.color}
            />
          ))}

          {/* {DAC && PolygonMarkers.map((PolygonMarker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: PolygonMarker.latitude, longitude: PolygonMarker.longitude }}
              color={PolygonMarker.color}
            />
            
          ))} */}

          {polygonCoordinates.length >= 3 &&
            <Polygon
              coordinates={polygonCoordinates}
              strokeWidth={2}
              fillColor="rgba(0, 0, 255,0.5)"
              zIndex={5}
              fillOpacity={0.35}

            />
          }
         

          {drawpolygonCoordinates.length >= 3 && (
            <Polygon
              coordinates={drawpolygonCoordinates}
              strokeWidth={2}
              fillColor="rgba(255, 10, 10,0.5)"
              zIndex={5}
              fillOpacity={0.35}
            />
          )}
        </MapView>

      </View>
{
  markNewLocation && (
    <Animatable.View
          style={styles.tooltipContainerLocation}
          animation="fadeIn"
          duration={3000}
          iterationCount={1}
          onAnimationEnd={() => setMarkNewLocation(false)}
        >
          <Text style={styles.tooltipText}>
            Mark New Location
            <Icon name="ios-arrow-forward" size={30} color="white" />
          </Text>
        </Animatable.View>
  )
}
      

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      )}

      <TouchableOpacity style={styles.optionIconContainer} onPress={handleOptionPress}>
        <Icon name="ios-pin" size={28} color="#333" />
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.closeIconContainer3} onPress={closeModal}>
              <Icon name="ios-close-circle" color="gray" size={30} />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleUpdateMarkedLocation}
              >
                <Text style={styles.modalButtonText}>  Mark New Location</Text>
              </TouchableOpacity>


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

      
      {tip1 && showTooltip && DACdataInvalid && (
        <Animatable.View
          style={styles.tooltipContainer}
          animation="fadeIn"
          duration={3000}
          iterationCount={1}
          onAnimationEnd={() => setShowTooltip(false)}
        >
          <Text style={styles.tooltipText}>Mark Building Footprints<Icon name="ios-arrow-forward" size={30} color="white" />
          </Text>
        </Animatable.View>
      )}

      {showTooltipJamalpur && (
        <Animatable.View
          style={styles.tooltipContainerJamalpur}
          animation="fadeIn"
          duration={3000}
          iterationCount={1}
          onAnimationEnd={() => setShowTooltipJamalpur(false)}
        >
          <Text style={styles.tooltipText}>
            Go to JamalPur
            <Icon name="ios-arrow-forward" size={30} color="white" />
          </Text>
        </Animatable.View>
      )}

      <TouchableOpacity
        style={styles.getDACIcon}
        onPress={handleBuildingCV}>
        <Icon name="ios-pencil" size={30} color="#333" />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.gotoJamalpurIcon}
        onPress={gotoJamalpur}>
        <Icon name="ios-navigate" size={30} color="#333" />
      </TouchableOpacity>

      {showDACPopup && (
        <View style={styles.DACPopupContainer}>
          <View style={styles.DACPopup}>
            <TouchableOpacity style={styles.closeIconContainer} onPress={() => setShowDACPopup(false)}>
              <Icon name="ios-close-circle" color="gray" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.DACPopupButton} onPress={drawBuildingFootPrints}>
              <Text style={styles.DACPopupButtonText}>Draw Building Footprints</Text>
            </TouchableOpacity>
            <Text style={[styles.footerText, styles.designText]}>
              *LongPress on map to draw boundary/Contour around building precisely
            </Text>
            <TouchableOpacity style={styles.DACPopupButton} onPress={getBuildingFootPrints}>
              <Text style={styles.DACPopupButtonText}>Get Building Footprints</Text>
            </TouchableOpacity>
            <Text style={[styles.footerText, styles.designText]}>
              *Generate boundary automatically
            </Text>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.locationContainer}>
          <Animated.View style={[styles.footerContent, { transform: [{ translateY: footerPosition }] }]}>
            <Text style={styles.markedLocationText}>
              Current Location: {mLat !== null ? mLat.toFixed(4) : 28.6139}° N,{' '}
              {mLong !== null ? mLong.toFixed(4) : 77.209}° E
            </Text>
            {selectedLocations.length > 0 && (
              <>
                <View style={styles.line} />
                <Text style={styles.markedLocationText}>
                  Marked Location: {selectedLocations[selectedLocations.length - 1].latitude.toFixed(4)}° N,{' '}
                  {selectedLocations[selectedLocations.length - 1].longitude.toFixed(4)}° E
                </Text>
              </>
            )}
            <View style={styles.line} />

            {DAC && (
              <Text style={styles.markedLocationText}>
                {DACdataInvalid ? 'Your DAC: NULL' : `Your DAC: ${dacValue}`}
              </Text>
            )}

            <Text style={[styles.footerText, styles.designText]}>GPS Accuracy: 700 meters</Text>
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.down} onPress={toggleFooter}>
          <Icon name={footerVisible ? 'ios-arrow-down' : 'ios-arrow-up'} size={40} color="black" />
        </TouchableOpacity>
      </View>


      <Dialog.Container visible={showMapOptions}>
        <Dialog.Title>Map Options</Dialog.Title>
        <Dialog.Description>Choose a map option:</Dialog.Description>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.mapOptionButton, selectedMapOption === 'osm' && styles.selectedMapOptionButton]}
            onPress={() => {
              setLayer('osm');
              setSelectedMapOption('osm'); // Update the selected map option
              setShowMapOptions(false);
            }}
          >
            <Image
              source={require('../../../assets/images/osm.png')}
              style={styles.dialogImage}
            />
            <Text style={styles.buttonText}>Bhuvan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mapOptionButton, selectedMapOption === 'bhuvan' && styles.selectedMapOptionButton]}
            onPress={() => {
              setLayer('bhuvan');
              setSelectedMapOption('bhuvan'); // Update the selected map option
              setShowMapOptions(false);
            }}
          >
            <Image
              source={require('../../../assets/images/default.png')}
              style={styles.dialogImage}
            />
            <Text style={styles.buttonText}>OSM</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.mapOptionButton, selectedMapOption === 'satellite' && styles.selectedMapOptionButton]}
            onPress={() => {
              setLayer('satellite');
              setSelectedMapOption('satellite'); // Update the selected map option
              setShowMapOptions(false);
            }}
          >
            <Image
              source={require('../../../assets/images/satellite.png')}
              style={styles.dialogImage}
            />
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mapOptionButton, selectedMapOption === 'esri' && styles.selectedMapOptionButton]}
            onPress={() => {
              setLayer('esri');
              setSelectedMapOption('esri'); // Update the selected map option
              setShowMapOptions(false);
            }}
          >
            <Image
              source={require('../../../assets/images/esri_satellite.png')}
              style={styles.dialogImage}
            />
            <Text style={styles.buttonText}>Esri</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.mapOptionButton, selectedMapOption === 'mapbox' && styles.selectedMapOptionButton]}
          onPress={() => {
            setLayer('mapbox');
            setSelectedMapOption('mapbox'); // Update the selected map option
            setShowMapOptions(false);
          }}
        >
          <Image
            source={require('../../../assets/images/mapbox.png')}
            style={styles.dialogImage}
          />
          <Text style={styles.buttonText}>Mapbox</Text>
        </TouchableOpacity>
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
    color: 'white',
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
  // footer: {
  //   backgroundColor: '#9AC5F4',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'flex-end', // Align the icon to the right-hand side
  },
  footerContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  down: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Updated to use RGBA color for 50% opacity
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
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
    top: 200,
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
    top: 300,
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
  // down:{
  //   alignItems: 'center',
  // },
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
    top: 200,
    right: 12,
    marginLeft: 10,
    backgroundColor: '#fff',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 4,
  },
  gotoJamalpurIcon:{
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
    marginBottom: 60,
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

  // Tooltip styles
  tooltipContainer: {
    position: 'absolute',
    top: 200, 
    // left: '50%',
    right: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainerJamalpur: {
    position: 'absolute',
    top: 250, 
    // left: '50%',
    right: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainerLocation:{
    position: 'absolute',
    top: 110, 
    // left: '50%',
    right: 50,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tooltipText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 3,
    borderColor: 'transparent', 
  },

  selectedMapOptionButton: {
    borderColor: '#007bff',
  },
});


export default MainScreen;




//----------------------------------------------------------------------------------------------------------------------------------------------



