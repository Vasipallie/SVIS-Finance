
import React, { useEffect, useState } from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput,KeyboardAvoidingView,ScrollView,Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Link, router } from 'expo-router';
import { auth, app } from '../firebase';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import react from 'react';
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context';

const TransactionsAdd = () => {
  const [fontsLoaded] = useFonts({
    GSans: require('../../assets/font.ttf'),
    GSansB: require('../../assets/fontb.ttf'),
  });
  
  useEffect(() => {

  }, []);
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#000'}} edges={["top"]}>
        <LinearGradient colors={['#000000ff', '#160c28']} style={styles.container}>
            <Image source={require('../../assets/SVIS-white.png')} style={{ width: 120, height: 70, resizeMode: 'contain' }} />
            <View style={styles.hr}/>
          <Text style={[styles.texti, {alignSelf: 'flex-start', width: '100%', marginBottom: 0}]}>Add Transaction</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#999"
          />
          <Text style={styles.textio}>Choose a Category</Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => alert('Transaction Added!')}>
              <Text style={styles.buttonText}>Log Transaction</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TransactionsAdd

const styles = StyleSheet.create({
  texti:{
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'GSansB',
  }, 
  
  textio:{
    color: '#ffffffff',
    fontSize: 20,
    marginBlock: 10,
    lineHeight:0,
    fontFamily: 'GSans',
  }, 
  hr:{
    width: '100%',
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ffffffff',
    borderStyle: 'solid',
  },
    container: {
    flex: 1,
    backgroundColor: '#0b0615', 
    paddingInline: 10,   
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
    backgroundColor: 'rgba(30, 20, 50, 0.95)',
    borderColor: '#4f1dab',
    borderWidth: 1.5,
    padding: 12,
    fontFamily: 'GSans',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginTop: 18,
    color: '#fff',
    fontSize: 18,
    outlineStyle: 'none',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
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
    marginTop: 5,
    backgroundColor: '#ff5800',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
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