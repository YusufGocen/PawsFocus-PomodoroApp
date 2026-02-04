import { View, Text,StyleSheet  , Image} from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


type NavigationProp=NativeStackNavigationProp<any>

export default function SplashScreen() {

    const navigation=useNavigation<NavigationProp>()

    const DEV_FORCE_ONBOARDING = true;

   useEffect(() => {
     const checkOnboarding=async () => {
       try {
        const hasSeen=await AsyncStorage.getItem('has_seen_onboarding')

        if (__DEV__ && DEV_FORCE_ONBOARDING) {
          setTimeout(() => {
            navigation.replace('Onboarding');
          }, 1000);
          return;
        }

        setTimeout(() => {
          if (hasSeen==='true'){
            navigation.replace('Focus')
          }else{
            navigation.replace('Onboarding')
          }
        }, 30000);
       } catch (error) {
        navigation.replace('Onboarding')
       }
     }
     checkOnboarding()
   },[])


  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={require('../assets/images/SplashScreenImage.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    Image:{
      height:'20%',
      width:'45%',
      borderRadius:'10%',
      resizeMode:'center'
      
    }
})