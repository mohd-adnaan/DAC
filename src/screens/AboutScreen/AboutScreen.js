import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';

import aboutImage from '../../../assets/images/nrsclogo.png';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Icon
            name="ios-arrow-back"
            color="gray"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.heading}>About the DAC App</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={aboutImage} style={styles.image} resizeMode="contain" />
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              The DAC app allows users to sign in, access their location via GPS, mark points on a map, and retrieve unique
              Digital Address Codes (DACs) based on latitude and longitude coordinates.
            </Text>
            <Text style={styles.descriptionText}>
              It is built using React Native for cross-platform functionality, PHP for server connectivity, and PostgreSQL as
              the database.
            </Text>
            <Text style={styles.descriptionText}>
              The DAC app is developed by NRSC-North, ISRO.
            </Text>
            <Hyperlink linkDefault={true} linkStyle={styles.link}>
              <Text style={styles.linkText}>For more information, visit: www.nrsc.gov.in</Text>
            </Hyperlink>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4EAF7',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heading: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  description: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#9AC5F4',
    width: '90%',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'justify',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  linkText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AboutScreen;
