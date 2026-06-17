import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  duration: number 
  onFinish?: () => void
  onPauseChange?: (isPaused: boolean) => void
}

export default function SessionTimer({ duration, onFinish,onPauseChange }: Props) {
    const [secondsLeft, setSecondsLeft] = useState(duration * 0)
    const [isPaused, setIsPaused] = useState(false)
    const [finished, setFinished] = useState(false)
  
    useEffect(() => {
      if (isPaused || finished) return
  
      const interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setFinished(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
  
      return () => clearInterval(interval)
    }, [isPaused, finished])
  
    useEffect(() => {
      if (finished) {
        onFinish?.()
      }
    }, [finished])

    const handlePauseToggle = () => {
      const newPausedState = !isPaused
      setIsPaused(newPausedState)
      onPauseChange?.(newPausedState)
    }

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePauseToggle} 
      >
        <Ionicons
          name={isPaused ? 'play' : 'pause'}
          size={38}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timer: {
    fontSize: 56,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 24,
  },
  button: {
    width:70,
    height:70,
    backgroundColor: '#F1BFA8',
    borderRadius: 35,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
})
