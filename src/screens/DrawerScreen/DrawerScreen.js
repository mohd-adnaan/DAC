import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import ParentScreen from '../ParentScreen/ParentScreen';
import SupportScreen from '../SupportScreen/SupportScreen';
import AboutScreen from '../AboutScreen/AboutScreen';
import MainScreen from '../MainScreen/MainScreen';
import SignOutScreen from '../SignOutScreen/SignOutScreen';
import UserScreen from '../UserScreen/UserScreen';
const Drawer = createDrawerNavigator();



const DrawerScreen = () => {
  const navigation = useNavigation();

const handleSupportPress = () => {
  navigation.navigate('Support');
};

  return (
    <Drawer.Navigator>
 <Drawer.Screen
  name="DAC"
  component={MainScreen}
  options={({ navigation }) => ({
    headerShown: true,
    headerStyle: {
      backgroundColor: '#9AC5F4',
    },
    headerTitleAlign: 'center',
    headerTitle: 'DAC',
    headerRight: () => (
      <TouchableOpacity onPress={handleSupportPress}>
      <Icon name="information-circle-outline" size={28} color="#333" style={{ marginRight: 10 }} />

      </TouchableOpacity>
    ),
  })}
/>
      <Drawer.Screen name = 'User' component={UserScreen}
      options={{headerShown:false}}
      />
      <Drawer.Screen name = 'Support' component ={SupportScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen name = 'About' component={AboutScreen}
        option={{headerShown:false}}
      />
      <Drawer.Screen name = 'SignOut' component={SignOutScreen}
        option={{headerShown:false}}

      />  
    </Drawer.Navigator>
  )
}

export default DrawerScreen