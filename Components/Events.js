import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Dimensions
} from "react-native";
import Images from "react-native-remote-svg";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import EventDetails from "./EventDetails";
import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCpsdNSarpuc8Cb3GHcHjbPYvfBeim2JkY",
  authDomain: "cognizance2k19-169d7.firebaseapp.com",
  databaseURL: "https://cognizance2k19-169d7.firebaseio.com",
  projectId: "cognizance2k19-169d7",
  storageBucket: "",
  messagingSenderId: "656512761398",
  appId: "1:656512761398:web:d5221d4e8653cd22"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class Events extends Component {
  componentDidMount() {
    // this.props.navigation.navigate("EventStack");
  }

  navigate = route => {
    this.props.navigation.navigate(route);
  };

  render() {
    const AppNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        {
          Technical: props => (
            <EventDetails {...props} navigate={this.navigate} />
          ),
          Nontechnical: props => (
            <EventDetails {...props} navigate={this.navigate} />
          ),
          Workshops: props => (
            <EventDetails {...props} navigate={this.navigate} />
          )
        },
        {
          tabBarOptions: {
            activeTintColor: "white",
            style: {
              backgroundColor: "transparent"
            },
            labelStyle: {
              // fontSize: 10,
              // fontWeight:'bold'
            },
            indicatorStyle: {
              opacity: 0
            }
          }
        }
      )
    );

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/back1.jpg")}
          style={styles.backImage}
        >
          <View style={styles.topHeader}>
            <View style={styles.back} />
            <View style={styles.heading}>
              <Text style={styles.headerText}>Events</Text>
            </View>
            <View style={styles.waveContainer}>
              <Image
                source={require("../assets/wave.png")}
                style={styles.wave}
              />
            </View>
          </View>
          <View style={styles.main}>
            <AppNavigator />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    marginTop: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    // borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 15
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    width: 170
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15
  },
  headerText: {
    color: "#fff",
    fontSize: 25
  },
  topHeader: {
    flex: 2.2
  },
  heading: {
    marginTop: 10,
    marginLeft: 20,
    width: "50%"
  },
  backImage: {
    flex: 1
  },
  card: {
    width: 320,
    height: 575,
    top: screenHeight / 8,
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  wave: {
    alignSelf: "flex-start",
    marginTop: 10,
    justifyContent: "flex-end"
  },
  waveContainer: {
    marginLeft: 20,
    justifyContent: "flex-end"
  },
  main: {
    flex: 6
  },
  back: {
    height: 40,
    width: 40
  }
});
