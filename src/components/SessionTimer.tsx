import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

type Props = {
  duration: number // dakika
  onFinish?: () => void
}

export default function SessionTimer({ duration, onFinish }: Props) {
    const [secondsLeft, setSecondsLeft] = useState(duration * 60)
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

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsPaused(p => !p)}
      >
        <Text style={styles.buttonText}>
          {isPaused ? 'Resume' : 'Pause'}
        </Text>
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
    paddingHorizontal: 26,
    paddingVertical: 12,
    backgroundColor: '#F1BFA8',
    borderRadius: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
