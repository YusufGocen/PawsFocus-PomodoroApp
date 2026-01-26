import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp=NativeStackNavigationProp<any>

export default function SplashScreen() {

    const navigation=useNavigation<NavigationProp>()

    useEffect (() => {
      const timer=setTimeout(() => {
       navigation.replace('Focus') 
      },3000);
      return ()=>clearTimeout(timer)
    },[])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Paws & Focus</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    text:{
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
    }
})