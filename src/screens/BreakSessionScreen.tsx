import { View, Text,StyleSheet ,StatusBar} from 'react-native'
import React, { useEffect ,useState,useRef} from 'react'
import { useRoute ,useNavigation} from '@react-navigation/native'
import SessionTimer from '../components/SessionTimer'
import { Video } from 'expo-av'
import VideoBackground from '../components/VideoBackground'
import * as ScreenOrientation from 'expo-screen-orientation'


const BreakSessionScreen = () => {

  const route = useRoute<any>()
  const navigation=useNavigation<any>()

  const { focusDuration, breakDuration } = route.params
  const videoRef=useRef<Video>(null)
  const [isPaused, setİsPaused] = useState(false)

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
        source={require('../assets/videos/BreakVideo.mp4')}
        isPaused={isPaused}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Break Time</Text>

        <SessionTimer
          duration={breakDuration}
          onFinish={() => {
            navigation.replace('SessionCompleted', {
              focusDuration,
              breakDuration,
            })
          }}
        />
      </View>
    </View>
  )
  
}
export default BreakSessionScreen;
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