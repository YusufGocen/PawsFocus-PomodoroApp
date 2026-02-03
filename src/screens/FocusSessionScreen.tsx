import { View, Text,StyleSheet } from 'react-native'
import React, { useEffect ,useState} from 'react'
import { useRoute ,useNavigation} from '@react-navigation/native'
import SessionTimer from '../components/SessionTimer'

export default function FocusSessionScreen() {
  const route = useRoute<any>()
  const navigation=useNavigation<any>()

  const { focusDuration, breakDuration } = route.params


  return (
    <View style={styles.safe}>
      <Text style={styles.title}>Focus time</Text>
      <SessionTimer duration={focusDuration} onFinish={() => {
        console.log('Focus Finish') , navigation.replace('BreakSession',{focusDuration,breakDuration})
      }}/>
    </View>
  )
  
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7EFE9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: '#2B2B2B',
    fontWeight: '600',
  },
  timer: {
    fontSize: 64,
    fontWeight: '700',
    color: '#F1BFA8',
  },
})
