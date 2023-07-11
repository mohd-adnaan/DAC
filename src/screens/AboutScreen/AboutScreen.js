// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const AboutScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>About the DAC App</Text>
//       <Text style={styles.description}>This is the About page for the DAC app developed for NRSC-North, ISRO.</Text>
//       <Text style={styles.description}>The app allows users to sign in, access their location via GPS, mark points on a map, and retrieve unique Digital Address Codes (DACs) based on latitude and longitude coordinates.</Text>
//       <Text style={styles.description}>It is built using React-Native for cross-platform functionality, PHP for server connectivity, and PostgreSQL as the database.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color:'black',
//   },
//   description: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
// });

// export default AboutScreen;








// import React from 'react';
// import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// import aboutImage from '../../../assets/images/nrsclogo.png';

// const AboutScreen = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.imageContainer}>
//         <Image source={aboutImage} style={styles.image} resizeMode="contain" />
//       </View>
//       <Text style={styles.heading}>About the DAC App</Text>
//       <Text style={styles.description}>
//         This is the About page for the DAC app developed for NRSC-North, ISRO.
//       </Text>
//       <Text style={styles.description}>
//         The app allows users to sign in, access their location via GPS, mark points on a map, and retrieve unique
//         Digital Address Codes (DACs) based on latitude and longitude coordinates.
//       </Text>
//       <Text style={styles.description}>
//         It is built using React-Native for cross-platform functionality, PHP for server connectivity, and PostgreSQL as
//         the database.
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   imageContainer: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: 'black',
//   },
//   description: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
// });

// export default AboutScreen;


import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';

import aboutImage from '../../../assets/images/nrsclogo.png';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.closeIconContainer}>
          <Icon
            name="ios-close-circle"
            color="gray"
            size={50}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={aboutImage} style={styles.image} resizeMode="contain" />
          </View>
          <View style={styles.header}>
            <Text style={styles.heading}>About the DAC App</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              This is the About page for the DAC app developed for NRSC-North, ISRO.
            </Text>
            <Text style={styles.descriptionText}>
              The app allows users to sign in, access their location via GPS, mark points on a map, and retrieve unique
              Digital Address Codes (DACs) based on latitude and longitude coordinates.
            </Text>
            <Text style={styles.descriptionText}>
              It is built using React Native for cross-platform functionality, PHP for server connectivity, and PostgreSQL as
              the database.
            </Text>
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
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
  header: {
    alignItems: 'center',
    paddingTop: 5,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#9AC5F4',
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'justify',
    paddingTop: 5,
    marginBottom: 10,
  },
});

export default AboutScreen;
