import { View, Text ,StyleSheet , TouchableOpacity, Image,} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import {Timer,Activity,Flame,Leaf,CheckCircle} from 'lucide-react-native'

const options = [
  {
    title: '25 min',
    subtitle: 'Classic',
    minutes: 25,
    icon: Timer,
  },
  {
    title: '30 min',
    subtitle: 'Steady',
    minutes: 30,
    icon: Activity,
  },
  {
    title: '45 min',
    subtitle: 'Deep',
    minutes: 45,
    icon: Flame,
  },
  {
    title: '60 min',
    subtitle: 'Focus',
    minutes: 60,
    icon: Leaf,
  },
]



export default function FocusScreen() {

  const navigation=useNavigation<any>()
  const [selected, setSelected] = useState<number | null>(null)


  const handleNext = () => {
    if (!selected) return
    navigation.navigate('Break', { focusDuration: selected })
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Chose Your Focus Time </Text>

      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/images/ChooseFocus.png')}
          style={styles.heroImage}
        />
      </View>

      <View style={styles.grid}>
        {options.map((item,index) => {
          const Icon=item.icon
          const isActive=selected===item.minutes
          return(
            <TouchableOpacity  style={[styles.card, isActive && styles.activeCard]} key={index} activeOpacity={0.85} onPress={() => setSelected(item.minutes)}>
              <View style={styles.iconWrapper}>
              <Icon size={28} color={isActive ? '#F1BFA8' : '#B5B5B5'} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
               {isActive && (
                <View style={styles.check}>
                  <CheckCircle size={20} color="#F1BFA8" />
                </View>
                )}
            </TouchableOpacity>
          )
        })}
      </View>
        <TouchableOpacity
          style={[styles.nextButton, !selected && styles.disabled]}
          disabled={!selected}
          onPress={handleNext}>
          <Text style={styles.nextText}>Next →</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7EFE9',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 24,
    color: '#2B2B2B',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'relative',
  },
  activeCard: {
    borderColor: '#F1BFA8',
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F7EFE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2B2B2B',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#7A7A7A',
  },
  check: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  nextButton: {
    marginTop: 20,
    height: 52,
    backgroundColor: '#F1BFA8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  heroImage: {
    width: '80%',
    height:'85%',
    borderRadius: 24,
    marginTop: 12,
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
    height:'30%'
  },
})
