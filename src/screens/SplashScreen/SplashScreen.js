// import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>DAC</Text>
            <Text style={styles.text}>An app for returning the Digital Address Code(DAC) of the active and current location of the user on the Indian Map.</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
                    <LinearGradient
                        colors={['#64CCC5', '#64CCC5']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Get Started</Text>
                        <MaterialIcons 
                            name="navigate-next"
                            color="#fff"
                            size={20}
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={styles.footer2}>
                <Image
                    source={require('../../../assets/images/nrsclogo.png')}
                    style={styles.footerImage}
                    resizeMode="contain"
                />
                <Text style={styles.footerText2}>Design and Developed by NRSC, ISRO</Text>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#E1EDF9'
  },
  header: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 30,
      paddingHorizontal: 30
  },
  footer2: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      fontSize: 18,
      marginTop:5,
      textAlign: 'justify'
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 10
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
  },
  footerImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  footerText2: {
    fontSize: 12,
    color: '#888',
  },
});
