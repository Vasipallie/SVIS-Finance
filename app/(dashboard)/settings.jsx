
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
import { Link, router } from 'expo-router';
import { auth, app } from '../firebase';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';


const Home = () => {
  const [fontsLoaded] = useFonts({
    GSans: require('../../assets/font.ttf'),
    GSansB: require('../../assets/fontb.ttf'),
  });

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        alert('Logged out successfully');
        router.replace('/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
        alert('Logout failed: ' + error.message);
      });
  };

  const hide = () => {
    alert('Balance hidden');
  };

  return (
    <LinearGradient colors={['#3c163d', '#160c28']} style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Image source={require('../../assets/SVIS-white.png')} style={{ width: 120, height: 70, resizeMode: 'contain' }} />
        {/* THIS IS CODE FOR A NICE ICON - BEGIN */}
        <LinearGradient colors={['#a0a0a0ff', '#333399']} style={{ padding: 2, borderRadius: 100 }} onClick={() => router.replace('notifications')}>
          <View style={styles.icon}>
            <Image source={require('../../assets/ntif.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          </View>
        </LinearGradient>
        {/* THIS IS CODE FOR A NICE ICON - END */}
      </View>
      <Text style={styles.texti}>Settings</Text>
      {/*
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>LogOut</Text>
        </TouchableOpacity>
      */}
    </LinearGradient>
  );
};

export default Home

const styles = StyleSheet.create({
  cardholder:{
    width: '100%',
    height: 10,
    backgroundColor: '#4f1dab',
    borderRadius: 10,
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
    marginTop: 20,
    marginBottom: 0,
    lineHeight:0,
    fontFamily: 'GSans',
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
    paddingBlockStart: 10,
    paddingInline: 10,
    paddingBottom: 10,     
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
    color: 'white',
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
  }
})