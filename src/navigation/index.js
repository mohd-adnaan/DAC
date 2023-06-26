import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import SupportScreen from '../screens/SupportScreen';;
import MainScreen from "../screens/MainScreen";
import WebScreen from "../screens/WebScreen";
import BhuvanScreen from "../screens/BhuvanScreen";
import DrawerScreen from "../screens/DrawerScreen"; 
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Bhuvan" component={BhuvanScreen} />
        <Stack.Screen name="Web" component ={WebScreen}/>
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Drawer" component={DrawerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
