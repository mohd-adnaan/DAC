import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>DACin</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E4EAF7',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;