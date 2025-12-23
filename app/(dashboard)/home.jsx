import React, { useEffect, useState } from 'react'
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
import react from 'react';
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [toggled, setToggled] = React.useState(false);
    const [wallet, setWallet] = useState(null);

  const initializeWallet = async () => {
    try {
      const storedData = await AsyncStorage.getItem('wallet');
      const walletParsed = storedData ? JSON.parse(storedData) : null;
      setWallet(walletParsed);
    } catch (error) {
      console.error('Error with AsyncStorage:', error);
    }
  };
  const balance = wallet ? `$ ${wallet.balance.toLocaleString()}` : '$ 0.00';

  React.useEffect(() => {
    initializeWallet();
  }, []);
const tagMap = {
    transport: { icon: 'train', color: '#2d89ef', label: 'Transport' },
    food: { icon: 'fast-food', color: '#ee1111', label: 'Dining' },
    entertainment: { icon: 'film', color: '#00aba9', label: 'Entertainment' },
    utilities: { icon: 'flash', color: '#ffc40d', label: 'Utilities' },
    groceries: { icon: 'cart', color: '#7e3878', label: 'Groceries' },
    shopping: { icon: 'storefront', color: '#b91d47', label: 'Shopping' },
    other: { icon: 'wallet', color: '#ff5600', label: 'Other Spending' },
    salary: { icon: 'cash', color: '#1a7f37', label: 'Salary' },
  };

  let transactionCards = null;
  if (wallet && Array.isArray(wallet.transactions) && wallet.transactions.length > 0) {
    transactionCards = wallet.transactions.slice().reverse().slice(0, 4).map((txn, idx) => {
      const tagInfo = tagMap[txn.tags] || tagMap.other;
      const isIn = txn.txn === 1;
      const amount = typeof txn.money === 'number' && !isNaN(txn.money) ? txn.money.toLocaleString() : 'ERROR';
      return (
        <LinearGradient
          key={idx}
          colors={isIn ? ['#fff', '#d7ffdeff'] : ['#fff', '#ffd8d7ff']}
          style={{borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 8, elevation: 3}}
        >
          <View style={{width: 44, height: 44, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: tagInfo.color, marginRight: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 4, elevation: 2}}>
            <Ionicons name={tagInfo.icon} size={32} color="#ffffff" />
          </View>
          <View style={{flex: 1, minWidth: 0}}>
            <Text style={{fontFamily: 'GSansB', fontSize: 16, color: '#222'}} numberOfLines={1} ellipsizeMode="tail">{tagInfo.label}</Text>
            <Text style={{fontFamily: 'GSans', fontSize: 13, color: '#888'}} numberOfLines={1} ellipsizeMode="tail">{txn.description}</Text>
          </View>
          <Text style={{fontFamily: 'GSansB', fontSize: 16, color: isIn ? '#1a7f37' : '#ee1111', marginLeft: 8}} numberOfLines={1} ellipsizeMode="tail">{isIn ? '+ ' : '- '}${amount}</Text>
        </LinearGradient>
      );
    });
  } else {
    transactionCards = <Text style={{color: '#fff', textAlign: 'center'}}>No transactions found.</Text>;
  }


  const hide = () => setToggled(!toggled);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}} edges={["top"]}>
      <LinearGradient colors={['#000000ff', '#160c28']} style={styles.container}>
          <Image source={require('../../assets/SVIS-white.png')} style={{ width: 120, height: 70, resizeMode: 'contain' }} />
          <View style={styles.hr}/>
        <LinearGradient colors={['#fff', '#d5b2ffff']} style={[styles.data, {shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 8, marginBottom: 10}]}> 
          <Text style={styles.textio}>My Balance</Text>
          <Text style={styles.hb}>{toggled ? '$ ****.**' : balance}</Text>
          <TouchableOpacity onPress={hide} style={{ alignSelf: 'flex-start', marginTop: 5 }}>
            <Text style={{ color: '#4f1dab', fontFamily: 'GSans', textDecorationLine: 'underline', fontSize: 16 }}>
              <Ionicons name={toggled ? "eye-off-outline" : "eye-outline"} style={{marginBottom: -5}} size={20} color="#4f1dab" /> {toggled ? "Show" : "Hide"} Balance
            </Text>
          </TouchableOpacity>
          <View style={styles.stats}>
            <View style={{alignItems: 'center', flex: 1, marginRight: 8, backgroundColor: '#c7ffddff', borderRadius: 12, padding: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
              <Text style={{ color: '#1a7f37', fontFamily: 'GSans', fontSize: 16 }}>Income</Text>
              <Text style={{ color: '#1a7f37', fontFamily: 'GSans', fontSize: 26, marginTop: 1, fontWeight: 'bold' }}>$ 3,500.00</Text>
            </View>
            <View style={{alignItems: 'center', flex: 1, marginLeft: 8, backgroundColor: '#ffd0d0ff', borderRadius: 12, padding: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
              <Text style={{ color: '#c0392b', fontFamily: 'GSans', fontSize: 16 }}>Expenditure</Text>
              <Text style={{ color: '#c0392b', fontFamily: 'GSans', fontSize: 26, marginTop: 1, fontWeight: 'bold' }}>$ 12,500.00</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.txns}>
          <View style={styles.txnr} />
          <Text style={[styles.texti, {alignSelf: 'center', flexWrap: 'wrap', width: '100%'}]}>Recent Transactions</Text>
          <View style={{width: '100%', marginTop: 12}}>
           <ScrollView style={{marginTop: 20}}>
                   {transactionCards}
          </ScrollView>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home

const styles = StyleSheet.create({
  holder:{
    width: 44,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a7f37',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
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
    backgroundColor: '#30015cff',
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
  textio:{
    color: '#000000ff',
    fontSize: 20,
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
  hr:{
    width: '100%',
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ffffffff',
    borderStyle: 'solid',
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