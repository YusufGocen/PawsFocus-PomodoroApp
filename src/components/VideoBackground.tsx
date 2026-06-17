import { StyleSheet, View } from 'react-native'
import React, { forwardRef } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
  source: any
  isPaused: boolean
}

const VideoBackground = forwardRef<Video, Props>(
  ({ source, isPaused }, ref) => {
    return (
      <View style={styles.container}>
        <Video
          ref={ref}
          source={source}
          shouldPlay={!isPaused}
          isLooping
          isMuted
          resizeMode={ResizeMode.COVER}
          style={StyleSheet.absoluteFill}
        />

          <LinearGradient
          colors={[
            'rgba(0,0,0,0.75)',
            'rgba(0,0,0,0.1)',
            'rgba(0,0,0,0.1)'
          ]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>
    )
  }
)

export default VideoBackground

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFF',
  },
})