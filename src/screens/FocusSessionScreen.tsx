import { View, Text,StyleSheet ,StatusBar} from 'react-native'
import React, { useEffect ,useState,useRef} from 'react'
import { useRoute ,useNavigation} from '@react-navigation/native'
import SessionTimer from '../components/SessionTimer'
import { Video } from 'expo-av'
import VideoBackground from '../components/VideoBackground'
import * as ScreenOrientation from 'expo-screen-orientation'

export default function FocusSessionScreen() {
  const route = useRoute<any>()
  const navigation=useNavigation<any>()

  const { focusDuration, breakDuration } = route.params
  const videoRef=useRef<Video>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    )

    return () => {
      ScreenOrientation.unlockAsync()
    }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <VideoBackground
        ref={videoRef}
        source={require('../assets/videos/FocusVideo.mp4')}
        isPaused={isPaused}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Focus Time</Text>

        <SessionTimer
          duration={focusDuration}
          onFinish={() => {
            navigation.replace('BreakSession', {
              focusDuration,
              breakDuration,
            })
          }}
          onPauseChange={setIsPaused}
        />
      </View>
    </View>
  )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
})