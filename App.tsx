import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Navigation from './src/navigation/index.js';
import 'react-native-gesture-handler';
const App = () => {
return (
<SafeAreaView style={styles.root}>
<Navigation />
</SafeAreaView>
);
};

const styles = StyleSheet.create({
root: {
flex: 1,
backgroundColor: '#F9FBFC',
},
});

export default App;