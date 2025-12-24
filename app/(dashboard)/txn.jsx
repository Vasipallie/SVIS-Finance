import React, { useEffect, useState } from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput,KeyboardAvoidingView,ScrollView,Platform,FlatList, RefreshControl} from 'react-native';
import { Link, router } from 'expo-router';
import { auth, app } from '../firebase';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import react from 'react';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

const Transactions = () => {
  const [fontsLoaded] = useFonts({
    GSans: require('../../assets/font.ttf'),
    GSansB: require('../../assets/fontb.ttf'),
  });
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
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    initializeWallet().then(() => setRefreshing(false));
  }, []);   
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      initializeWallet();
    }
  }, [isFocused]);
  const tagMap = {
    transport: { icon: 'train', color: '#2d89ef', label: 'Transport' },
    food: { icon: 'fast-food', color: '#ee1111', label: 'Dining' },
    entertainment: { icon: 'film', color: '#00aba9', label: 'Entertainment' },
    utilities: { icon: 'flash', color: '#ff8e0dff', label: 'Utilities' },
    groceries: { icon: 'cart', color: '#7e3878', label: 'Groceries' },
    shopping: { icon: 'storefront', color: '#b91d47', label: 'Shopping' },
    other: { icon: 'wallet', color: '#ff5600', label: 'Other Spending' },
    salary: { icon: 'cash', color: '#1a7f37', label: 'Salary' },
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}} edges={["top"]}>
    <LinearGradient colors={['#000000ff', '#160c28']} style={styles.container}>
        <Image source={require('../../assets/SVIS-white.png')} style={{ width: 120, height: 70, resizeMode: 'contain' }} />
        <View style={styles.hr}/>
      <Text style={[styles.texti, {alignSelf: 'flex-start', flexWrap: 'wrap', maxWidth: '100%',width:'100%', marginBottom: 0}]}>Transactions</Text>
     
      {wallet?.transactions && wallet.transactions.length > 0 ? (
        <FlatList
          data={wallet.transactions.slice().reverse()}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => {
            const tagInfo = tagMap[item.tags] || tagMap.other;
            const isIn = item.txn === 1;
            return (
              <LinearGradient
                colors={isIn ? ['#fff', '#d7ffdeff'] : ['#fff', '#ffd8d7ff']}
                style={{borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 8, elevation: 3}}
              >
                <View style={{width: 44, height: 44, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: tagInfo.color, marginRight: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 4, elevation: 2}}>
                  <Ionicons name={tagInfo.icon} size={32} color="#ffffff" />
                </View>
                <View style={{flex: 1, minWidth: 0}}>
                  <Text style={{fontFamily: 'GSansB', fontSize: 16, color: '#222'}} numberOfLines={1} ellipsizeMode="tail">{tagInfo.label}</Text>
                  <Text style={{fontFamily: 'GSans', fontSize: 13, color: '#888'}} numberOfLines={1} ellipsizeMode="tail">{item.description}</Text>
                </View>
                <Text style={{fontFamily: 'GSansB', fontSize: 16, color: isIn ? '#1a7f37' : '#ee1111', marginLeft: 8}} numberOfLines={1} ellipsizeMode="tail">{isIn ? '+ ' : '- '}${item.money.toLocaleString()}</Text>
              </LinearGradient>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ marginTop: 20, flex: 1, width: '100%' }}
        />
      ) : (
        <Text style={{color: '#fff', textAlign: 'center', marginTop: 40, fontSize: 18, fontFamily: 'GSans'}}>No transactions found.</Text>
      )}
    </LinearGradient>
    </SafeAreaView>
  );
};


export default Transactions

const styles = StyleSheet.create({
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
    marginTop: 5,
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