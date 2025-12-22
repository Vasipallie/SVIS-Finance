import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { VideoView, useVideoPlayer } from 'expo-video'
import {Link, router} from 'expo-router'
import { useFonts } from 'expo-font';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from './firebase';


const Forgot = () => {
  const [fontsLoaded] = useFonts({
    'GSans': require('../assets/font.ttf'),
  });
  const [email, setEmail] = useState('')

  const player = useVideoPlayer(require('../assets/SVIS-intro.mp4'), player => {
    player.loop = true
    player.muted = true
    player.play()
  })
  const handleSubmit = () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }
    if (email.includes('@')) {
      import('firebase/auth').then(({ sendPasswordResetEmail }) => {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            alert('Password reset email sent!');
            router.replace('/');
          })
          .catch((error) => {
            console.error('Password reset error:', error);
            alert('Password reset failed: ' + error.message);
          });
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
            <Text style={styles.h1}>Forgot Password</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            <Link href="/" style={styles.a}>
              <Text style={styles.a}>Login with a SVIS Account</Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  ) 
}

export default Forgot

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tes:{
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginTop: 5,
    textAlign: 'left',
    fontFamily: 'GSans',
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
    padding: 10,
    borderRadius:6,
    paddingHorizontal: 10,
    marginTop: 10,
    fontFamily: 'GSans',
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
    fontWeight: 'bold'
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
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'GSans',
  },
  a: {
    color: '#ff5800',
    fontSize: 16,
    fontFamily: 'GSans',
    fontWeight: '500',
    marginTop: 15,
    textAlign: 'center',
  }
})  