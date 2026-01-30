import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import FocusScreen from '../screens/FocusScreen'
import React from 'react'
import Onboarding from '../screens/OnboardingScreen'

const Stack=createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <Stack.Navigator id='RootStackList' initialRouteName='Splash' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Splash' component={SplashScreen}/>
        <Stack.Screen name='Focus' component={FocusScreen}/>
        <Stack.Screen name='Onboarding' component={Onboarding}/>
    </Stack.Navigator>
  )
}