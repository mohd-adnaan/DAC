import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Hyperlink from 'react-native-hyperlink';

import Icon from 'react-native-vector-icons/Ionicons';

const SupportScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <View>
                <Icon 
                    name="ios-close-circle" 
                    color='gray'
                    size={50}
                    onPress={() => {navigation.goBack()}}
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.heading}>Support</Text>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText1}>SISDP-U Collect app is developed by Regional Centres of NRSC, ISRO for Ground Truth data collection under SISDP Update Project</Text>
                {/* <Text style={styles.descriptionText2}></Text> */}
                <Text style={styles.contacts}>For any Technical Support, Contact:</Text>
                <Text style={[styles.contactPerson, {fontSize: 16, fontWeight: 'bold', paddingTop: 10}]}>Khushboo Mirza</Text>
                <Text style={styles.contactPerson}>Scientist/Engineer</Text>
                <Text style={styles.contactPerson}>Regional Remote Sensing Centre - North</Text>
                <Text style={styles.contactPerson}>National Remote Sensing Centre</Text>
                <Text style={styles.contactPerson}>Indian Space Research Organization (ISRO)</Text>
                <Text style={styles.contactPerson}>Department of Space, Government of India, New Delhi</Text>
                <View style={{flexDirection: 'row'}} >
                    <Text style={[styles.contactPerson, {fontSize: 16}]}>Email: </Text>
                    <Hyperlink linkDefault={ true } >
                        <Text style={[styles.contactPerson, {fontSize: 16, color: 'blue', textDecorationLine: 'underline'}]} >khushboo_m@nrsc.gov.in</Text>
                    </Hyperlink>
                </View>
            </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#E4EAF7",
    //paddingVertical: 50,
    position: "relative"
  },
  header: {
    alignItems: 'center',
    paddingTop: 5
},
heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#32502E'
},
description:{
    padding: 10,
    borderColor:'#32502E',
    borderWidth:2,
    marginVertical:10,
    marginHorizontal: 10,
    borderRadius:10,
    backgroundColor:'#1E88E5',
},
descriptionText1:{
    fontSize:16,
    color:'#000',
    textAlign:'justify',
    paddingTop:5,
},
descriptionText2:{
    fontSize:16,
    color:'#000',
    textAlign:'justify',
    paddingTop:5,
},
contacts:{
    fontSize:16,
    paddingTop:20,
    color:'#000',
    fontWeight:'bold',
},
contactPerson: {
    fontSize:16,
    color:'#000',
},
});

export default SupportScreen;