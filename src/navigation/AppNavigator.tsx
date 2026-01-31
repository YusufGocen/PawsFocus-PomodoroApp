import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import FocusScreen from '../screens/FocusScreen'
import BreakScreen from '../screens/BreakScreen'
import React from 'react'
import Onboarding from '../screens/OnboardingScreen'
import FocusSession from '../screens/FocusSessionScreen'
import BreakSession from '../screens/BreakSessionScreen'


const Stack=createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <Stack.Navigator id='RootStackList' initialRouteName='Splash' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Splash' component={SplashScreen}/>
        <Stack.Screen name='Focus' component={FocusScreen}/>
        <Stack.Screen name='Onboarding' component={Onboarding}/>
        <Stack.Screen name='Break' component={BreakScreen}/>
        <Stack.Screen name='FocusSession' component={FocusSession}/>
        <Stack.Screen name='BreakSession' component={BreakSession}/>
    </Stack.Navigator>
  )
}