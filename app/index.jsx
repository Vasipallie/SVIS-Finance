import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VideoView, useVideoPlayer } from 'expo-video'
import {Link, router} from 'expo-router'
import { useFonts } from 'expo-font';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from './firebase';

const Index = () => {
  const [fontsLoaded] = useFonts({
    'GSans': require('../assets/font.ttf'),
    'GansB': require('../assets/fontb.ttf'),
  });
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  //Check if user is alr signed in
  useEffect(() => { 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is still signed in:', user.email)
        router.replace('home');
      } 
    });
    return () => unsubscribe();
  }, []);

  const player = useVideoPlayer(require('../assets/SVIS-intro.mp4'), player => {
    player.loop = true
    player.muted = true
    player.play()
  })
  const handleSubmit = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    if (email.includes('@') && password.length >= 6) {
      //Lets authenticate with Firebase
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log('Login successful:', user.email);
        alert('Login successful!');
        router.replace('home');
      }).catch((error) => {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
      });
    }
  }
  return (
    <View style={styles.container}> 
      <VideoView
        player={player}
        style={styles.backgroundVideo}
        contentFit="cover"
        nativeControls={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        > 
          <View style={styles.overlay}>
            <Image source={require('../assets/SVIS-white.png')} style={styles.img} />
            <View style={{borderBottomColor: 'white', borderBottomWidth: 1, marginTop:1}}></View>
            <Text style={styles.h1}>Login</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.tes}>
            <Link href="/forgot" style={styles.a}>
              <Text style={styles.a}>Forgot Password?</Text>
            </Link>
            <Text style={styles.tes}> / </Text>
            <Link href="/signup" style={styles.a}>
              <Text style={styles.a}>Create a SVIS Account</Text>
            </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  ) 
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tes:{
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginTop: 5,
    fontFamily: 'GSans',
    textAlign: 'left',
    cursor: 'pointer',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end', 
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBlockStart: 10,
    paddingInline: 10,
    paddingBottom: 20,
    minHeight: '50%',
    backgroundColor: '#0b0615',
  },
  input: {
    backgroundColor: '#26114dff',
    borderColor: '#767676',
    fontFamily: 'GSans',
    padding: 10,
    borderRadius:6,
    paddingHorizontal: 10,
    marginTop: 10,
    color: '#ffffffff',
    fontSize: 16,
    outlineStyle: 'none',
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'GSans',
    fontWeight: 'bold',
  },
  img: {
    width: 120,
    height: 60,
    alignSelf: 'center',
  },
  h1: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'GSans',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
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
    fontFamily: 'GSans',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
    textAlign: 'center',
  }
})  