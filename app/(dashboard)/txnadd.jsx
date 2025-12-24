
import React, { useEffect, useState } from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput,KeyboardAvoidingView,ScrollView,Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Link, router } from 'expo-router';
import { auth, app } from '../firebase';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import react from 'react';
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const TransactionsAdd = () => {
  const [fontsLoaded] = useFonts({
    GSans: require('../../assets/font.ttf'),
    GSansB: require('../../assets/fontb.ttf'),
  });  
  const [category, SetCategory] = useState(null);
  const [txnStyle, SetTxnStyle] = useState(null);
  const [amount, SetAmount] = useState(0);
  const [description, SetDescription] = useState('');

  const TxnHander = async (txz) => {
    const Storage = await AsyncStorage.getItem('wallet');
    if (Storage) {
      const wallet = JSON.parse(Storage);
      wallet.transactions = wallet.transactions || [];
      wallet.transactions.push(txz);
      if (txz.txn === 1) {
        wallet.balance += txz.money;
        wallet.income += txz.money;
        await AsyncStorage.setItem('wallet', JSON.stringify(wallet));
        alert('Income logged!');
      } else {
        wallet.balance -= txz.money;
        wallet.expenditure += txz.money;
        await AsyncStorage.setItem('wallet', JSON.stringify(wallet));
        alert('Expense logged!');
      }
    } else {
      const newWallet = {
        balance: txz.txn === 1 ? txz.money : -txz.money,
        income: txz.txn === 1 ? txz.money : 0,
        expenditure: txz.txn === 0 ? txz.money : 0,
        transactions: [txz],
      };
      await AsyncStorage.setItem('wallet', JSON.stringify(newWallet));
      alert(txz.txn === 1 ? 'Income logged!' : 'Expense logged!');
    }
  }

  const TxnAdd = ()=> {
    const newTxn = {
      money: amount,
      description: description,
      tags: category,
      txn: txnStyle,
      time: Date.now(),
  }
  TxnHander(newTxn);
  };
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
            onChangeText={text => SetAmount(parseFloat(text) || 0)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#999"
            onChangeText={text => SetDescription(text)}
          />
          <View style={styles.toggleRow}> 
            <TouchableOpacity 
              style={[styles.toggleBtn, txnStyle === 1 && styles.toggleBtnActive]}
              onPress={() => SetTxnStyle(1)}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={28} color={txnStyle === 1 ? '#fff' : '#bdbdbd'} />
              <Text style={[styles.toggleText, txnStyle === 1 && styles.toggleTextActive]}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, txnStyle === 0 && styles.toggleBtnActive]}
              onPress={() => SetTxnStyle(0)}
              activeOpacity={0.8}
            >
              <Ionicons name="remove" size={28} color={txnStyle === 0 ? '#fff' : '#bdbdbd'} />
              <Text style={[styles.toggleText, txnStyle === 0 && styles.toggleTextActive]}>Expense</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.textio}>Choose a Category</Text>
          <View style={styles.categoryGrid}>
            <TouchableOpacity style={[styles.slot, category === 'dining' && styles.selectedSlot]} onPress={() => SetCategory('dining')}>
              <Ionicons name="fast-food" size={28} color="#fff" />
              <Text style={styles.textio}>Dining</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.slot, category === 'entertainment' && styles.selectedSlot]} onPress={() => SetCategory('entertainment')}>
              <Ionicons name="film" size={28} color="#fff" />
              <Text style={styles.textio}>Entertainment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.slot, category === 'groceries' && styles.selectedSlot]} onPress={() => SetCategory('groceries')}>
              <Ionicons name="cart" size={28} color="#fff" />
              <Text style={styles.textio}>Groceries</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.slot, category === 'shopping' && styles.selectedSlot]} onPress={() => SetCategory('shopping')}>
              <Ionicons name="storefront" size={28} color="#fff" />
              <Text style={styles.textio}>Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.slot, category === 'transport' && styles.selectedSlot]} onPress={() => SetCategory('transport')}>
              <Ionicons name="train" size={28} color="#fff" />
              <Text style={styles.textio}>Transport</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.slot, category === 'utilities' && styles.selectedSlot]} onPress={() => SetCategory('utilities')}>
              <Ionicons name="flash" size={28} color="#fff" />
              <Text style={styles.textio}>Utilities</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.slot, category === 'salary' && styles.selectedSlot]} onPress={() => SetCategory('salary')}>
              <Ionicons name="cash" size={28} color="#fff" />
              <Text style={styles.textio}>Salary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.slot, category === 'other' && styles.selectedSlot]} onPress={() => SetCategory('other')}>
              <Ionicons name="wallet" size={28} color="#fff" />
              <Text style={styles.textio}>Other</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={TxnAdd}>
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
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginVertical: 5,
      gap: 10,
    },
    slot: {
      backgroundColor: '#7e3878',
      paddingHorizontal: 18,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginBottom: 2,
      width: '47%',
      minHeight: 50,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      borderWidth: 1.5,
      borderColor: 'transparent',
      transitionDuration: '150ms',
    },
    selectedSlot: {
      borderColor: '#9e9e9eff',
      backgroundColor: '#a04fcf',
      elevation: 6,
      shadowOpacity: 0.22,
    },
    toggleRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      gap: 5,
    },
    toggleBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2d1a4d',
      borderRadius: 100,
      paddingVertical: 10,
      paddingHorizontal: 28,
      borderWidth: 2,
      borderColor: 'transparent',
      marginHorizontal: 4,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.10,
      shadowRadius: 4,
      transitionDuration: '150ms',
    },
    toggleBtnActive: {
      backgroundColor: '#4f1dab',
      borderColor: '#dcdcdcff',
      elevation: 5,
      shadowOpacity: 0.18,
    },
    toggleText: {
      color: '#bdbdbd',
      fontFamily: 'GSansB',
      fontSize: 20,
      marginLeft: 10,
    },
    toggleTextActive: {
      color: '#fff',
    },
    
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
  input: {
    backgroundColor: 'rgba(30, 20, 50, 0.95)',
    borderColor: '#4f1dab',
    borderWidth: 1.5,
    padding: 12,
    fontFamily: 'GSans',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
    outlineStyle: 'none',
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
});