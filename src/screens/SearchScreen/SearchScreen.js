import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY_MAP } from '@env';

const SearchScreen = () => {
  return (
    <View style = {{flex:1}}>
    <View style ={{width:'100%', padding:20}}>
    <GooglePlacesAutocomplete
    placeholder='Search'
    onPress={(data, details = true) => {
      // 'details' is provided when fetchDetails = true
      console.log(data, details);
    }}
    query={{
      key: API_KEY_MAP,
      language: 'en',
    }}
  />
    </View>
  </View>
  )
}

export default SearchScreen