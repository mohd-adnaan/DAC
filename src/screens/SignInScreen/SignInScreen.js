
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   useWindowDimensions,
//   ScrollView,
//   Alert,
// } from 'react-native';

// import Logo from '../../../assets/images/logoName.png';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import { useNavigation } from '@react-navigation/native';

// const SignInScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const { height } = useWindowDimensions();
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   const validateInput = (input) => {
//     const alphanumericRegex = /^[a-zA-Z0-9]+$/;
//     return alphanumericRegex.test(input);
//   };

//   const onSignInPressed = () => {
//     if (phoneNumber.length !== 10 || !Number.isInteger(Number(phoneNumber))) {
//       Alert.alert('Invalid Input', 'Phone number should contain exactly 10 digits.');
//       return;
//     }

//     navigation.navigate('Main');
//     //console.warn('Sign In');
//   };

//   const onSignUpPress = () => {
//     navigation.navigate('SignUp');
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.contentContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.content}>
//           <Image
//             source={Logo}
//             style={[styles.logo, { height: height * 0.3 }]}
//             resizeMode="contain"
//           />

        
//           <CustomInput
//             name="phoneNumber"
//             placeholder="Phone Number"
//             value={phoneNumber}
//             setValue={setPhoneNumber}
//             secureTextEntry={false}
//             style={styles.input}
//           />

//           <CustomButton
//             text={'Sign In'}
//             onPress={onSignInPressed}
//             style={styles.signInButton}
//             textStyle={styles.signInButtonText}
//           />
//           <CustomButton
//             text="Don't have an account? Register"
//             onPress={onSignUpPress}
//             type="TERTIARY"
//             style={styles.signUpButton}
//             textStyle={styles.signUpButtonText}
//           />
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <Image
//           source={require('../../../assets/images/nrsclogo.png')}
//           style={styles.footerImage}
//           resizeMode="contain"
//         />
//         <Text style={styles.footerText}>Design and Developed by NRSC, ISRO</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#E4EAF7',
//   },
//   contentContainer: {
//     flexGrow: 1,
//   },
//   content: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: '70%',
//     maxWidth: 300,
//     maxHeight: 200,
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 15,
//     backgroundColor: '#E1EDF9',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     width: '100%',
//     fontSize: 16,
//     color: '#444',
//   },
//   signInButton: {
//     marginBottom: 15,
//     backgroundColor: '#1E88E5',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     width: '100%',
//     alignItems: 'center',
//   },
//   signInButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   signUpButton: {
//     backgroundColor: 'transparent',
//     marginBottom: 5,
//   },
//   signUpButtonText: {
//     fontSize: 14,
//     color: '#1E88E5',
//   },
//   footer: {
//     alignItems: 'center',
//     paddingVertical: 10,
//     backgroundColor: '#F4F8FD',
//     borderTopWidth: 1,
//     borderTopColor: '#D3DCE6',
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#888',
//   },
//   footerImage: {
//     width: 50,
//     height: 50,
//     marginBottom: 5,
//   },
// });

// export default SignInScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';

import Logo from '../../../assets/images/logoName.png';
import EmblemLogo from '../../../assets/images/emblem.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const validateInput = (input) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(input);
  };

  const onSignInPressed = () => {
    if (phoneNumber.length !== 10 || !Number.isInteger(Number(phoneNumber))) {
      Alert.alert('Invalid Input', 'Phone number should contain exactly 10 digits.');
      return;
    }

    navigation.navigate('Main');
    //console.warn('Sign In');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />

          <CustomInput
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            setValue={setPhoneNumber}
            secureTextEntry={false}
            style={styles.input}
          />

          <CustomButton
            text={'Sign In'}
            onPress={onSignInPressed}
            style={styles.signInButton}
            textStyle={styles.signInButtonText}
          />

          <CustomButton
            text="Don't have an account? Register"
            onPress={onSignUpPress}
            type="TERTIARY"
            style={styles.signUpButton}
            textStyle={styles.signUpButtonText}
          />

          <Image
            source={EmblemLogo}
            style={styles.emblemLogo}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Image
          source={require('../../../assets/images/nrsclogo.png')}
          style={styles.footerImage}
          resizeMode="contain"
        />
        <Text style={styles.footerText}>Design and Developed by NRSC, ISRO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E4EAF7',
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#E1EDF9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    fontSize: 16,
    color: '#444',
  },
  signInButton: {
    marginBottom: 15,
    backgroundColor: '#1E88E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  signUpButtonText: {
    fontSize: 14,
    color: '#1E88E5',
  },
  emblemLogo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#F4F8FD',
    borderTopWidth: 1,
    borderTopColor: '#D3DCE6',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
  footerImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});

export default SignInScreen;
