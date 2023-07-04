import React from 'react';
import SignInScreen from '../SignInScreen/SignInScreen';
import { useNavigation } from '@react-navigation/native';

const SignOutScreen = () => {
  const navigation = useNavigation();
  return (
    navigation.navigate("SignIn")
  );
};

export default SignOutScreen;
