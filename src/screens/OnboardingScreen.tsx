import { Pressable, StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const slides = [
  {
    title: 'Paws & Focus',
    description:'find your rhythm, stay cozy.',
    image:require('../assets/images/deneme.png'),
    button:'Begin Journey'
  },
  {
    title: 'Deep Focus',
    description:'Dedicate time to your goals with guided Pomodoro sessions.',
    image:require('../assets/images/deneme.png'),
    button:'Continue'
  },
  {
    title: 'Mindful Breaks',
    description:'Recharge your energy with scheduled rest intervals. A quiet moment for your soul.',
    image:require('../assets/images/deneme.png'),
    button:'Get Started'
  }
]

const OnboardingScreen = () => {

  const navigation=useNavigation<any>()
  const [step, setStep] = useState(0)

  const HandleContinue = async () => {
    if(step < slides.length - 1){
      setStep(prev => prev + 1)
    }else{
      await AsyncStorage.setItem('has_seen_onboarding','true')
      navigation.replace('Focus')
    }
  }

  const current=slides[step]

  return (
<SafeAreaView style={styles.safe}>
  <View style={styles.container}>

    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={current.image} style={styles.image} />
      </View>

      <Text style={styles.title}>{current.title}</Text>
      <Text style={styles.desc}>{current.description}</Text>

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === step && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={HandleContinue}
      >
        <Text style={styles.buttonText}>{current.button}</Text>
      </TouchableOpacity>
    </View>

  </View>
</SafeAreaView>

  )
}

export default OnboardingScreen

const styles = StyleSheet.create({

  safe:{
    flex:1,
    backgroundColor:'#F7EFE9',
    textAlign:'center'
  },
  container:{
    flex: 1,
    paddingHorizontal:24,
    justifyContent: 'center',
  },
  imageWrapper:{
    width:'100%',
    height:320,
    backgroundColor:'#F7EFE9',
    borderRadius:24,
    marginTop:10,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  image:{
    width:'90%',
    height:'90%',
    resizeMode:'cover',
    borderRadius:18
  },
  title:{
    marginTop:32,
    fontSize:28,
    fontWeight:700,
    textAlign:'center',
    color:'#2B2B2B'
  },
  desc: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#7A7A7A',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  dot: {
    width: 9,
    height: 7,
    borderRadius: 3,
    backgroundColor: '#E0CFC5',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#F1BFA8',
  },
  button: {
    height: 47,        
    width: '40%',         
    backgroundColor: '#F0B9A4',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    alignItems: 'center',
  }
})