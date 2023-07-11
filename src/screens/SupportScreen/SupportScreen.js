// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// import Hyperlink from 'react-native-hyperlink';

// import Icon from 'react-native-vector-icons/Ionicons';

// const SupportScreen = ({navigation}) => {
//     return (
//       <View style={styles.container}>
//         <View>
//                 <Icon 
//                     name="ios-close-circle" 
//                     color='gray'
//                     size={50}
//                     onPress={() => {navigation.goBack()}}
//                 />
//             </View>
//             <View style={styles.header}>
//                 <Text style={styles.heading}>Support</Text>
//             </View>
//             <View style={styles.description}>
//                 <Text style={styles.descriptionText1}>An app to get the Digital Address Code(DAC) of the current and marked location of the user on the Indian Map.</Text>
//                 {/* <Text style={styles.descriptionText2}></Text> */}
//                 <Text style={styles.contacts}>For any Technical Support, Contact:</Text>
//                 <Text style={[styles.contactPerson, {fontSize: 16, fontWeight: 'bold', paddingTop: 10}]}>Khushboo Mirza</Text>
//                 <Text style={styles.contactPerson}>Scientist/Engineer</Text>
//                 <Text style={styles.contactPerson}>Regional Remote Sensing Centre - North</Text>
//                 <Text style={styles.contactPerson}>National Remote Sensing Centre</Text>
//                 <Text style={styles.contactPerson}>Indian Space Research Organization (ISRO)</Text>
//                 <Text style={styles.contactPerson}>Department of Space, Government of India, New Delhi</Text>
//                 <View style={{flexDirection: 'row'}} >
//                     <Text style={[styles.contactPerson, {fontSize: 16}]}>Email: </Text>
//                     <Hyperlink linkDefault={ true } >
//                         <Text style={[styles.contactPerson, {fontSize: 16, color: 'blue', textDecorationLine: 'underline'}]} >khushboo_m@nrsc.gov.in</Text>
//                     </Hyperlink>
//                 </View>
//             </View>
//       </View>
//     );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center',
//     backgroundColor: "#E4EAF7",
//     paddingVertical: 50,
//     position: "relative"
//   },
//   header: {
//     alignItems: 'center',
//     paddingTop: 5
// },
// heading: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'black'
// },
// description:{
//     padding: 10,
//     borderColor:'#32502E',
//     borderWidth:2,
//     marginVertical:10,
//     marginHorizontal: 10,
//     borderRadius:10,
//     backgroundColor:'#9AC5F4',
// },
// descriptionText1:{
//     fontSize:16,
//     color:'#000',
//     textAlign:'justify',
//     paddingTop:5,
// },
// descriptionText2:{
//     fontSize:16,
//     color:'#000',
//     textAlign:'justify',
//     paddingTop:5,
// },
// contacts:{
//     fontSize:16,
//     paddingTop:20,
//     color:'#000',
//     fontWeight:'bold',
// },
// contactPerson: {
//     fontSize:16,
//     color:'#000',
// },
// });

// export default SupportScreen;




import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Icon from 'react-native-vector-icons/Ionicons';

const SupportScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.closeIconContainer}>
        <Icon
          name="ios-close-circle"
          color="gray"
          size={50}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.heading}>Support</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          An app to get the Digital Address Code (DAC) of the current and marked location on the Indian Map.
        </Text>
        <Text style={styles.contacts}>For any technical support, contact:</Text>
        <Text style={styles.contactPerson}>Khushboo Mirza</Text>
        <Text style={styles.contactPerson}>Scientist/Engineer</Text>
        <Text style={styles.contactPerson}>Regional Remote Sensing Centre - North</Text>
        <Text style={styles.contactPerson}>National Remote Sensing Centre</Text>
        <Text style={styles.contactPerson}>Indian Space Research Organization (ISRO)</Text>
        <Text style={styles.contactPerson}>Department of Space, Government of India, New Delhi</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.emailLabel}>Email:</Text>
          <Hyperlink linkDefault={true}>
            <Text style={styles.emailLink}>khushboo_m@nrsc.gov.in</Text>
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
    backgroundColor: '#E4EAF7',
    paddingVertical: 50,
    position: 'relative',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  header: {
    alignItems: 'center',
    paddingTop: 5,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#9AC5F4',
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'justify',
    paddingTop: 5,
  },
  contacts: {
    fontSize: 16,
    paddingTop: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  contactPerson: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailLabel: {
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  emailLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SupportScreen;
