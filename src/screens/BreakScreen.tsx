import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Moon } from 'lucide-react-native'

const breakOptions = [
  {
    minutes: 5,
    title: 'Quick Pause',
    tag: 'STANDARD',
  },
  {
    minutes: 15,
    title: 'Relax & Stretch',
  },
  {
    minutes: 30,
    title: 'Power Nap',
  },
]

export default function BreakSelectScreen() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()

  const { focusDuration } = route.params
  const [selected, setSelected] = useState<number | null>(null)

  const handleStart = () => {
    if (!selected) return

    navigation.navigate('FocusSession', {
      focusDuration,
      breakDuration: selected,
    })
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Choose your break time</Text>
      <Text style={styles.subtitle}>
        Select a duration to recharge your energy.
      </Text>

      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/images/ChooseBreak.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageBadge}>
          <Moon size={14} color="#6B8E6E" />
          <Text style={styles.badgeText}>REST MODE</Text>
        </View>
      </View>

      {/* OPTIONS */}
      {breakOptions.map((item, index) => {
        const isActive = selected === item.minutes

        return (
          <TouchableOpacity
            key={index}
            style={[styles.card, isActive && styles.activeCard]}
            onPress={() => setSelected(item.minutes)}
            activeOpacity={0.85}
          >
            <View style={[styles.radio, isActive && styles.radioActive]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.minutes} min</Text>
              <Text style={styles.cardSub}>{item.title}</Text>
            </View>

            {item.tag && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            )}
          </TouchableOpacity>
        )
      })}

      {/* BUTTON */}
      <TouchableOpacity
        style={[styles.button, !selected && styles.disabled]}
        disabled={!selected}
        onPress={handleStart}
      >
        <Text style={styles.buttonText}>Start Session ▶</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7EFE9',
    paddingHorizontal: 20,
    justifyContent:'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2B2B2B',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#8B7E77',
    marginBottom: 30,
  },
  imageWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF3ED',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B8E6E',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  activeCard: {
    borderColor: '#C9D8C2',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C9D8C2',
    marginRight: 14,
  },
  radioActive: {
    backgroundColor: '#6B8E6E',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
  },
  cardSub: {
    fontSize: 13,
    color: '#8B7E77',
    marginTop: 2,
  },
  tag: {
    backgroundColor: '#EEF3ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B8E6E',
  },
  button: {
    marginTop: 20,
    height: 54,
    backgroundColor: '#F1BFA8',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
})
