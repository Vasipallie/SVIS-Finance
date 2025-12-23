import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { VideoView, useVideoPlayer } from 'expo-video'
import {Link, router} from 'expo-router'
import { auth, app } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';


const signup = () => {
  const [fontsLoaded] = useFonts({
    'GSans': require('../assets/font.ttf'),
  });

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const create = () => {
     createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('Signup successful:', user.email);
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log('Login successful:', user.email);
        alert('Signup and Login successful!');
          const initializeWallet = async () => {
    try {
      const walletData = {
        balance: 0,
        transactions: []
      };
      await AsyncStorage.setItem('wallet', JSON.stringify(walletData));
    } catch (error) {
      console.error('Error initializing wallet data:', error);
    }
          };
          initializeWallet();
        router.replace('home');
      }).catch((error) => {
        console.error('Login error after signup:', error);
        alert('Login failed after signup: ' + error.message);
      });
  })
  .catch((error) => {
    console.error('Signup error:', error);
    alert('Signup failed: ' + error.message);
  });

    }
  const player = useVideoPlayer(require('../assets/SVIS-intro.mp4'), player => {
    player.loop = true
    player.muted = true
    player.play()
  })

  return (
    <Text style={styles.hold}>
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
            <Text style={styles.h1}>Signup</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
            />

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
            <Text style={styles.tes}>By clicking "Signup", you agree to our <Link href="/terms" style={styles.a}>Terms of Service</Link> and <Link href="/privacy" style={styles.a}>Privacy Policy</Link>.</Text>
            <TouchableOpacity style={styles.button} onPress={create}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <Link href="/" style={styles.a}>
              <Text>Login with a SVIS Account</Text> 
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
    </Text>
  ) 
}

export default signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tes:{
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    fontFamily: 'GSans',
    marginTop: 5,
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
  img: {
    width: 120,
    height: 60,
    alignSelf: 'center',
  },
  h1: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'GSans',
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
    fontFamily: 'GSans',
    fontWeight: '500',
  },
  a: {
    color: '#ff5800',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
    fontFamily: 'GSans',
    textAlign: 'center',
  }
})  