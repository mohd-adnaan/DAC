
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const navigation = useNavigation();

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  const validateName = () => {
    const nameRegex = /^[A-Za-z]{3,25}$/;
    return nameRegex.test(name);
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateDesignation = () => {
    const designationRegex = /^[A-Za-z]{3,25}$/;
    return designationRegex.test(designation);
  };

  const validateDepartment = () => {
    const departmentRegex = /^[A-Za-z]{3,25}$/;
    return departmentRegex.test(department);
  };

  const validateAddress = () => {
    return address.trim().length > 0;
  };

  const validatePin = () => {
    const pinRegex = /^[0-9]{6}$/;
    return pinRegex.test(pin);
  };

  const validateState = () => {
    return state.trim().length > 0;
  };

  const onRegisterPressed = () => {
    if (!validateName()) {
      Alert.alert('Invalid Name', 'Name should contain only alphabets with a length between 3 and 25.');
      return;
    }

    if (!validatePhoneNumber()) {
      Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
      return;
    }

    if (!validateDesignation()) {
      Alert.alert('Invalid Designation', 'Designation should contain only alphabets with a length between 3 and 25.');
      return;
    }

    if (!validateDepartment()) {
      Alert.alert('Invalid Department', 'Department should contain only alphabets with a length between 3 and 25.');
      return;
    }

    if (!validateAddress()) {
      Alert.alert('Invalid Address', 'Address should not be empty.');
      return;
    }

    if (!validatePin()) {
      Alert.alert('Invalid Pin', 'Pin should contain only 6 digits.');
      return;
    }

    if (!validateState()) {
      Alert.alert('Invalid State', 'State should not be empty.');
      return;
    }

    // Perform registration logic here
    console.warn('Registration Successful');
    navigation.navigate('Web');
  
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <CustomInput
          name="name"
          value={name}
          setValue={setName}
          placeholder="Name"
          onBlur={() => {
            if (!validateName()) {
              Alert.alert('Invalid Name', 'Name should contain only alphabets with a length between 3 and 25.');
            }
          }}
        />

        <CustomInput
          name="phoneNumber"
          value={phoneNumber}
          setValue={setPhoneNumber}
          placeholder="Phone Number"
          onBlur={() => {
            if (!validatePhoneNumber()) {
              Alert.alert('Invalid Phone Number', 'Phone Number should contain only 10 digits.');
            }
          }}
        />

        <CustomInput
          name="designation"
          value={designation}
          setValue={setDesignation}
          placeholder="Designation"
          onBlur={() => {
            if (!validateDesignation()) {
              Alert.alert('Invalid Designation', 'Designation should contain only alphabets with a length between 3 and 25.');
            }
          }}
        />

        <CustomInput
          name="department"
          value={department}
          setValue={setDepartment}
          placeholder="Department"
          onBlur={() => {
            if (!validateDepartment()) {
              Alert.alert('Invalid Department', 'Department should contain only alphabets with a length between 3 and 25.');
            }
          }}
        />

        <CustomInput
          name="address"
          value={address}
          setValue={setAddress}
          placeholder="Address"
          onBlur={() => {
            if (!validateAddress()) {
              Alert.alert('Invalid Address', 'Address should not be empty.');
            }
          }}
        />

        <CustomInput
          name="pin"
          value={pin}
          setValue={setPin}
          placeholder="Pin"
          onBlur={() => {
            if (!validatePin()) {
              Alert.alert('Invalid Pin', 'Pin should contain only 6 digits.');
            }
          }}
        />

        <CustomInput
          name="state"
          value={state}
          setValue={setState}
          placeholder="State"
          onBlur={() => {
            if (!validateState()) {
              Alert.alert('Invalid State', 'State should not be empty.');
            }
          }}
        />

        <CustomButton text="Register" onPress={onRegisterPressed} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E4EAF7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    marginVertical: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;