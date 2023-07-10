import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About the DAC App</Text>
      <Text style={styles.description}>This is the About page for the DAC app developed for NRSC-North, ISRO.</Text>
      <Text style={styles.description}>The app allows users to sign in, access their location via GPS, mark points on a map, and retrieve unique Digital Address Codes (DACs) based on latitude and longitude coordinates.</Text>
      <Text style={styles.description}>It is built using React-Native for cross-platform functionality, PHP for server connectivity, and PostgreSQL as the database.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'black',
  },
  description: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default AboutScreen;
