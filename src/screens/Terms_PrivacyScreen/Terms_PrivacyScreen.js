import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Terms_PrivacyScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <View style={styles.closeIconContainer}>
        <Icon
          name="ios-close-circle"
          color="gray"
          size={50}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.title}>Terms of Use</Text>
      <Text style={styles.body}>
        By using the DAC app, you agree to the following terms and conditions:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {'\u2022'} You are solely responsible for your use of the app and for any consequences of such use.
        </Text>
        <Text style={styles.listItem}>
          {'\u2022'} You agree not to use the app for any illegal or unauthorized purposes.
        </Text>
        <Text style={styles.listItem}>
          {'\u2022'} You agree not to interfere with the operation of the app or the servers that host the app.
        </Text>
        <Text style={styles.listItem}>
          {'\u2022'} You agree to indemnify and hold harmless the developers of the DAC app from any and all
          claims arising from your use of the app.
        </Text>
      </View>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.body}>
        The DAC app collects and stores certain data about your use of the app, such as your
        location, the time and date of your use, and the pages you visit.
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {'\u2022'} The DAC app uses this data to improve the app and to provide you with personalized content.
        </Text>
        <Text style={styles.listItem}>
          {'\u2022'} You can opt-out of data collection by disabling location services on your device.
        </Text>
        <Text style={styles.listItem}>
          {'\u2022'} The DAC app does not share your data with any third parties.
        </Text>
      </View>
      <Text style={styles.agree}>
        By using the DAC app, you agree to the terms and conditions set forth above.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  list: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 12,
    marginRight: 5,
    marginTop: 5,
  },
  agree: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginTop: 20,
  },
});

export default Terms_PrivacyScreen;
