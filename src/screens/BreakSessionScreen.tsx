import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import SessionTimer from '../components/SessionTimer'


const BreakSessionScreen = () => {

  const route = useRoute<any>()
  const { breakDuration, focusDuration } = route.params

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Break Time</Text>
      <SessionTimer duration={breakDuration} onFinish={() => {
        console.log('Break Finish') , console.log(focusDuration,breakDuration)
      }}/>
    </SafeAreaView>
  )
}

export default BreakSessionScreen

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7EFE9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  timer: {
    fontSize: 56,
    fontWeight: '700',
    color: '#F1BFA8',
  },
  sub: {
    marginTop: 16,
    fontSize: 14,
    color: '#7A7A7A',
  },
})