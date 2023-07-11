import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import SupportScreen from '../screens/SupportScreen';
import MainScreen from "../screens/MainScreen/MainScreen";
import BhuvanScreen from "../screens/BhuvanScreen";
import DrawerScreen from "../screens/DrawerScreen"; 
import ParentScreen from "../screens/ParentScreen";
import AboutScreen from '../screens/AboutScreen';
import SignOutScreen from '../screens/SignOutScreen/SignOutScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import UserScreen from '../screens/UserScreen/UserScreen';
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
        <Stack.Screen name="Parent" component={ParentScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Drawer" component={DrawerScreen} />
        <Stack.Screen name="About" component={AboutScreen}/>
        <Stack.Screen name="SignOut" component={SignOutScreen}/>
        <Stack.Screen name="User" component={UserScreen}/>
        <Stack.Screen name ="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
