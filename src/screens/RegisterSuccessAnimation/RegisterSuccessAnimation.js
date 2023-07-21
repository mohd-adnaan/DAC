import React,{useEffect} from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const RegistrationSuccessAnimation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SignIn');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
     <Animatable.View
      animation="bounceIn"
      style={{
        backgroundColor: '#4285F4',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Ionicons
        style={{ alignSelf: 'center' }}
        name='checkmark-circle-outline'
        type='evilicon'
        color='#ffffff'
        size={100}
      />
      <Text style={{ color: '#ffffff', alignSelf: 'center', fontSize: 22 }}>Registration Successful</Text>
    </Animatable.View>
  );
};

export default RegistrationSuccessAnimation;
