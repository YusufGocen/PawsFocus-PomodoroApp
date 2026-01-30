import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

export default function FocusScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FocusScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    text:{
        fontSize: 24,
        fontWeight: '600',
    }
})