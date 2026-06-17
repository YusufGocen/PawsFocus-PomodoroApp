import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native'
import { useCallback, useEffect,useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SessionCompleted = () => {

  const [todaySessions, setTodaySessions] = useState(0)
  const navigation =useNavigation<any>()
  const route=useRoute<any>()
  const dailyGoal=4
  const {focusDuration , breakDuration , incrementSession}=route.params || {}

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      )

      return () => {
        ScreenOrientation.unlockAsync() 
      }
    }, [])
  )


useFocusEffect(
  useCallback (() => {
    const updateSessionCount=async () => {
      try {
        const today=new Date().toDateString()
        const savedDate=await AsyncStorage.getItem('sessionDate')
        const savedCount=await AsyncStorage.getItem('sessionCount')
        if(route.params?.incrementSession){

          navigation.setParams({incrementSession:false})

          if(savedDate===today){
            const newCount=parseInt(savedCount || '0') + 1
            await AsyncStorage.setItem('sessionCount', newCount.toString())
            setTodaySessions(newCount)
          }else{
            await AsyncStorage.setItem('sessionDate',today)
            await AsyncStorage.setItem('sessionCount','1')
            setTodaySessions(1)
          }
        }
        else{
          if(savedDate===today){
            setTodaySessions(parseInt(savedCount || '0'))
          }else{
            setTodaySessions(0)
          }
        }
      } catch (error) { 
        console.log('session count error' ,error)
      }
    }
    updateSessionCount()
  }, [route.params?.incrementSession])
)

  const currentCyle=todaySessions>0 ? ((todaySessions-1)%dailyGoal)+ 1 : 0

  const progress=Math.min((currentCyle / dailyGoal) * 100 , 100) 

  const handleRepeatSession = () => {
    navigation.navigate('FocusSession',{
      focusDuration,
      breakDuration
    })
  }

  const handleNewFocusTime = () => {
    navigation.navigate('Focus')
  }


  return (
    <SafeAreaView style={styles.safe}> 
      <View style={styles.container}>
        <Text style={styles.title}>Great Work! <FontAwesome name="paw" size={26} color="#D6A180" />
        </Text>
        <Text style={styles.desc}>You Completed your focus session</Text>
        <View style={styles.grid}>
          <Image
            source={require('../assets/images/Completed.png')}
            style={styles.heroImage}
          />
            <View style={styles.card}>
              <Text>Focus Time</Text>
              
            </View>

            <View style={styles.CardQuote}>
              <Text style={{ alignSelf: 'flex-start' }}>
                  <FontAwesome name="quote-left" size={16} color="#E59A6D" />
              </Text> 

              <View>
                <Text style={styles.QuoteDesc}>Small Consistent Efforts</Text>
                <Text style={styles.QuoteDesc}>Daily Lead To Big Results</Text>
              </View>

              <Text style={{ alignSelf: 'flex-end'}}>
                  <FontAwesome name="quote-right" size={16} color="#E59A6D" />
              </Text>

            </View>

            <View style={styles.progressCard}>
              <Text style={styles.progressTitle}>Your Progress</Text>

              <View style={styles.pawsContainer}>
                {[1,2,3,4].map((paw)=>(
                  <FontAwesome
                  key={paw}
                  name="paw"
                  size={30}
                  color={paw <= currentCyle ? '#6B8E6F' : '#D4CBC3'}
                />
                ))}
              </View>

              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]}/>
              </View>
              <Text style={styles.progressText}>{currentCyle} / {dailyGoal}</Text>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.secondaryButton} onPress={handleRepeatSession}>
                  <FontAwesome name='refresh' size={16} color='#FFF'/>
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.ButtonText2}>Repeat Session</Text>
                    <Text style={styles.repeatSubtitle}>
                      Start another {focusDuration} min focus session
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryButton} onPress={handleNewFocusTime}>
                  <FontAwesome name='clock-o' size={20} color='#8C9A67'/>
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.ButtonText}>New Focus Time</Text>
                    <Text style={styles.secondarySubtitle}>
                     Choose a different duration
                    </Text>
                  </View>
                </TouchableOpacity>
            </View>
        </View>


      </View>
    </SafeAreaView>
  )
}

export default SessionCompleted

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  },
  safe:{
    flex:1,
    backgroundColor:'#F9EFE7',
    textAlign:'center'
  },
  title:{
    fontSize:28,
    color:'#3E2F2B',
    marginTop:10,
    fontWeight:'700'
  },
  desc:{
    color:'#6C6B67',
    marginTop:20,
    fontWeight:'600'
  },
  card:{
    width: '75%',
    height:'35%',
    backgroundColor: '#FBF4F0',
    borderRadius: 24,
    padding: 20,  
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  grid:{
    width: '100%',
    marginTop: 120,
    alignItems: 'center',

  },
  heroImage:{
    height: 180,
    width: 180,
    alignSelf: 'center',
    position: 'absolute',
    top: -140, 
    zIndex: 10,
  },
  CardQuote:{
    backgroundColor: '#FAEBDF',
    height: 100,
    width: '75%',
    borderRadius: 24,
    padding: 20,
    marginTop: 20, 
    justifyContent: 'center', 
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'visible',
  },
  QuoteDesc:{
    textAlign:'center',
    fontSize:14,
    fontWeight:'600',
    color: '#3E2F2B',
    lineHeight: 20,
    
  },
  quoteLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  quoteRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    transform: [{ rotate: '180deg' }],
    zIndex: 10,
  },
  progressCard: {
    width: '75%',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3E2F2B',
    marginBottom: 15,
  },
  pawsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E8DDD3',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6B8E6F',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B8E6F',
    textAlign: 'right',
  },
  buttonRow:{
    flexDirection:'row',
    width:'90%',
    marginTop:14,
    gap:12
  },
  secondaryButton:{
    flex:1,
    height:56,
    backgroundColor:'#E8A98B',
    borderRadius:18,
    paddingHorizontal:16,
    alignItems:'center',
    flexDirection:'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    
  },
  ButtonText:{
    color:'#3E2F2B',
    fontSize:12,
    fontWeight:'600'
  },
  ButtonText2:{
    color:'#FFF5F0',
    fontSize:12,
    fontWeight:'700'
  },
  primaryButton:{
    flex:1,
    height:56,
    backgroundColor:'#FBF4F0',
    borderRadius:18,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'    
  },
  buttonTextContainer:{
    marginLeft:4
  },
  repeatSubtitle:{
    color:'#FFF5F0',
    fontSize:8,
    fontWeight:'700'
  },
  secondarySubtitle:{
    color:'#8C817B',
    fontSize:8,
    marginTop:2
  }


})