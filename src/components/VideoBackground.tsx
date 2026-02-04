import { StyleSheet, View } from 'react-native'
import React, { forwardRef } from 'react'
import { Video, ResizeMode } from 'expo-av'

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
