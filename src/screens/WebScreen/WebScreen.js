import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


// const MainScreen = () => {
//   return <WebView source={{ uri: 'https://www.openstreetmap.org/#map=6/23.805/79.739' }} style={{ flex: 1 }} />;
// }

const WebScreen = () => {
  return <WebView source={{ uri: 'https://bhuvan-app1.nrsc.gov.in/bhuvan2d/bhuvan/bhuvan2d.php' }} style={{ flex: 1 }} />;
 }
 export default WebScreen;