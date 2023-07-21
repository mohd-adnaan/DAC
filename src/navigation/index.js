import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import SupportScreen from '../screens/SupportScreen';
import MainScreen from "../screens/MainScreen/MainScreen";
import DrawerScreen from "../screens/DrawerScreen"; 
import ParentScreen from "../screens/ParentScreen";
import AboutScreen from '../screens/AboutScreen';
import SignOutScreen from '../screens/SignOutScreen/SignOutScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import UserScreen from '../screens/UserScreen/UserScreen';
import Terms_PrivacyScreen from '../screens/Terms_PrivacyScreen/Terms_PrivacyScreen';
import RegisterSuccessAnimation from "../screens/RegisterSuccessAnimation/RegisterSuccessAnimation"
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Parent" component={ParentScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Drawer" component={DrawerScreen} />
        <Stack.Screen name="About" component={AboutScreen}/>
        <Stack.Screen name="SignOut" component={SignOutScreen}/>
        <Stack.Screen name="User" component={UserScreen}/>
        <Stack.Screen name ="Search" component={SearchScreen} />
        <Stack.Screen name = "Terms_Privacy" component={Terms_PrivacyScreen}/>
        <Stack.Screen name = "RegisterSuccess" component ={RegisterSuccessAnimation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
