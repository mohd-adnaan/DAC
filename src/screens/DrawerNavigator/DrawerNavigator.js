import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AboutScreen from '../AboutScreen/AboutScreen';
import SupportScreen from '../SupportScreen/SupportScreen';
import SignInScreen from '../SignInScreen/SignInScreen';
import 'react-native-gesture-handler';

const navigation = useNavigation();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name = "About" component={AboutScreen}/>
    <Drawer.Screen name = "Support" component={SupportScreen}/>
    <Drawer.Screen name = "SignOut" component={SignInScreen}/>
  </Drawer.Navigator>
  );
};

export default DrawerNavigator;