
import React from 'react';
import {
  Alert,
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
import react from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const Settings = () => {
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
  const clearData = async () => {
    Alert.alert(
      'Confirm Data Clear',
      'Are you sure you want to clear all your data? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear Data',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('wallet');
              const walletData = {
                balance: 0.00,
                income: 0.00,
                expenditure: 0.00,
                transactions: []
              };
              await AsyncStorage.setItem('wallet', JSON.stringify(walletData));
              alert('Data cleared successfully');
            
            } catch (error) {
              alert('Failed to clear data: ' + error.message);
            }
          },
        }
      ]
    );
  }
  const exportData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('wallet');
      if (storedData) {
        const file = new File(Paths.document, 'wallet_data.json');
        await file.write(storedData);
        await Sharing.shareAsync(file.uri);
      } else {
        alert('No data to export');
      }
    } catch (error) {
      alert('Failed to export data: ' + error.message);
    }
  };
  return ( 
    
        <SafeAreaView style={{flex: 1, backgroundColor: '#000'}} edges={["top"]}>
    <LinearGradient colors={['#000000ff', '#160c28']} style={styles.container}>
        <Image source={require('../../assets/SVIS-white.png')} style={{ width: 120, height: 70, resizeMode: 'contain' }} />
        <View style={styles.hr}/>

        <TouchableOpacity style={styles.button} onPress={clearData}>
          <Text style={styles.buttonText}>Clear Data</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.button} onPress={exportData}>
          <Text style={styles.buttonText}>Export Data</Text>
        </TouchableOpacity>
    

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>LogOut</Text>
        </TouchableOpacity>
    
    </LinearGradient>
    </SafeAreaView>
  );
};

export default Settings

const styles = StyleSheet.create({
  hr:{
    width: '100%',
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ffffffff',
    borderStyle: 'solid',
  },
  texti:{
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'GSansB',
  }, 
  textio:{
    color: '#000000ff',
    fontSize: 20,
    marginBottom: 0,
    lineHeight:0,
    fontFamily: 'GSans',
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
  }
})