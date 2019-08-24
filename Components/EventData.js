import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground,Image,Dimensions,ScrollView,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 
export default class EventData extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <ImageBackground 
      style={styles.backImage}
      source={{uri:"http://sochilens.ru/wp-content/uploads/2018/02/NIKOLA-TEESLA-660x330.jpg"}}>
      <TouchableOpacity>
      <View style={{margin:screenHeight/25,backgroundColor:"rgba(0,0,0,0.5)",height:40,width:40,alignItems:"center",justifyContent:"center",borderRadius:10}}>
      <Ionicons  
        name="ios-arrow-back"
        size={30}
        color="#fff" 
      
        />
        </View>
        </TouchableOpacity>
      </ImageBackground>

    <View style={styles.dataContainer}>
    
      <View style={styles.heartContainer}>
        <Ionicons  
        name="md-heart"
        size={30}
        color="red"
        />
        </View>
      <ScrollView>
      <View style={styles.topHeading}>  
       <Text style={{flex:1 ,color:"#000",fontSize:25,fontWeight:"700",opacity:1,padding:10}}>
          Quizpicable Me   
        </Text>   
          <Text style={{fontWeight:"700",marginRight:screenWidth/8,color:"#000"}}>100 </Text>
       </View>
       <View style={styles.mainDataContainer}> 
         <Text style={styles.heading}>About Event  </Text>
         <Text style={styles.data}>This event will test your general and technical knowledge in the horizon of electronics and communication engineering and its history. It would also test your ability to work as a team.</Text>
          <Text style={styles.heading}>Event details  </Text>
          
          <View>
            <View style={styles.eventDetailsContainer}>
            <View style={styles.eventDetails} >
                <Text style={styles.eventDetailsHeading}>Date</Text>
                <Text style={styles.eventDetailsData}>13-14 Step</Text>
                
                
              </View>
             <View style={styles.eventDetails} >
                <Text style={styles.eventDetailsHeading}>Price</Text>
                <Text style={styles.eventDetailsData}>150</Text>    
              </View>
              
            </View>
             <View style={styles.eventDetailsContainer}>
              <View style={styles.eventDetails} >
                <Text style={styles.eventDetailsHeading}>Venue</Text>
                <Text style={styles.eventDetailsData}>Charusat</Text>
                 
                
              </View>
             <View style={styles.eventDetails} >
                 <Text style={styles.eventDetailsHeading}>Max participants</Text>
                <Text style={styles.eventDetailsData}>Group of 2</Text>    
              </View>
              
            </View>
          </View>
      </View>
    </ScrollView> 
       
      </View> 
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:Constants.statusBarHeight
    
  },
  backImage:{
    height:screenHeight/2.5,
    width:screenWidth
  },
  dataContainer:{
  flex:1,
  backgroundColor:"#fff",
  marginTop:-screenHeight/11.2, 
  borderTopRightRadius:50,
  
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  },
  heartContainer:{
    height:screenHeight/12,
    width:screenHeight/12,
    borderRadius:screenHeight/6,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"flex-end",
    marginRight:screenWidth/12,
    marginTop:-screenHeight/24,
    shadowColor: "#000",
    shadowOffset: {
	      width: 0,
	      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,


  },
  mainDataContainer:{
     flex:1,
     margin:10
  },
  heading:{
    fontSize:20,
    fontWeight:"bold",
    padding:10,
    color:"#000"
  },
  data:{
    fontSize:15,
    margin:5,
    marginLeft:20,
    lineHeight:20,
    color:"#000"


  }, 
  topHeading:{
    justifyContent:"space-between",
    flexDirection:"row",
    paddingTop:10,
    color:"#000"

  },
  eventDetails:{
    flex:1,
    padding:10
  },
  eventDetailsContainer:{
    flex:1,
    flexDirection:"row"
  },
  eventDetailsHeading:{
    fontSize:15,
    fontWeight:"bold",
    color:"#000",


  }, eventDetailsData:{
    fontSize:12,
    color:"#000"

    
  }
});
