import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import react from 'react';

const Cards = () => {
  const [fontsLoaded] = useFonts({
    GSans: require('../assets/font.ttf'),
    GSansB: require('../assets/fontb.ttf'),
  });

  return (
    
        <SafeAreaView style={{flex: 1, backgroundColor: '#000'}} edges={["top"]}>
    <LinearGradient colors={['#000000ff', '#160c28']} style={styles.container}>
        <Image source={require('../assets/SVIS-white.png')} style={{ width: 120, height: 70, resizeMode: 'contain' }} />
        <View style={styles.hr}/>
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
            <Text style={[styles.texti, {alignSelf: 'left', flexWrap: 'wrap', width: '100%'}]}>
                Privacy Policy
            </Text>
            <Text style={styles.body}>

Your privacy is important to us. We do not store any personal data on our servers. All user data remains on your device. The only information used for authentication is your email address and password, which are securely managed by our authentication provider. We do not collect, share, or sell any personal information.
</Text>
<Text style={styles.texti}>
Terms of Service
</Text>
<Text style={styles.body}>
By using this app, you agree to the following terms:

You are responsible for maintaining the confidentiality of your login credentials.
The app uses your email and password solely for authentication purposes.
No personal data is stored or processed by us beyond authentication.
We reserve the right to update these terms at any time.
                
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );
};

export default Cards
  
const styles = StyleSheet.create({
  txnr:{
    width:60,
    backgroundColor:'#ffffff',
    height:3,
    alignSelf:'center',
    marginBottom:5,
    borderRadius:5,
  },
  txns:{
    alignItems:'center',
    flex: 1,
    marginTop: 10,
    backgroundColor: '#31005fff',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  data:{
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 16,
  },
  stats:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  item:{
    backgroundColor: '#4f1dab',
    padding: 10,
    marginVertical: 8,
    width: 160,
    height: 50,
    borderRadius: 100,
    flexDirection: 'row',
    boxSizing: 'border-box',
  },
  texti:{
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'GSansB',
  }, 
  nameplate: {
      width: '100%',
      height: 80,
      backgroundColor: '#4f1dab',
      borderRadius: 100,
      marginTop: 5,
      padding: 5,
      marginBottom: 5,
    },
    nameicon:{
      borderRadius: 100,
      width: 60,
      height: 60,
      alignItems: 'center',      
    },
    container: {
    flex: 1,
    backgroundColor: '#0b0615', 
    paddingInline: 10,   
  },
  hr:{
    width: '100%',
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ffffffff',
    borderStyle: 'solid',
  },
  icon:{
    borderRadius: 100,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#4f1dab',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#767676',     
    padding: 10,
    fontFamily: 'GSans',
    borderRadius:6,
    paddingHorizontal: 10,
    marginTop: 15,
    color: '#000000',
    fontSize: 16,
    outlineStyle: 'none',
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'GSans',
    fontWeight: 'bold',
  },
  h1: {
    color: 'white',
    fontFamily: 'GSans',
    fontSize: 40,
    fontWeight: 'bold'
  },
  hb: {
    color: 'black',
    fontFamily: 'GSansB',
    fontSize: 50,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff5800',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderWidth: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'GSans',
    fontSize: 20,
    fontWeight: '500',
  },
  a: {
    color: '#ff5800',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
    fontFamily: 'GSans',
    textAlign: 'center',
    cursor: 'pointer',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#4f1dab',
  },
  body: {
    fontSize: 16,
    color: '#ffffffff',
    marginBottom: 20,
  },
})