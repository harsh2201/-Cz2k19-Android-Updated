import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions
} from "react-native";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import EventDetails from "./EventDetails";
import * as firebase from "firebase";
import Text from "./customText";
import firebaseConfig from "../Data/config";
import track from "../Data/Amplitude";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class Events extends Component {
  navigate = (route, params) => {
    this.props.navigation.navigate(route, params);
  };
  componentDidMount() {
    this.props.navigation.addListener("didFocus", payload => {
      track(this.props.navigation.state.routeName);
    });
  }
  render() {
    const AppNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        {
          Technical: props => (
            <EventDetails {...props} navigate={this.navigate} />
          ),
          "Non Technical": props => (
            <EventDetails {...props} navigate={this.navigate} />
          ),
          Workshops: props => (
            <EventDetails {...props} navigate={this.navigate} />
          )
        },
        {
          tabBarOptions: {
            activeTintColor: "white",
            upperCaseLabel: false,
            style: {
              backgroundColor: "transparent"
            },
            labelStyle: {
              fontSize: 13,
              fontFamily: "lexendDeca"
            },
            indicatorStyle: {
              opacity: 0,
              height: 50,
              backgroundColor: "#000",
              borderRadius: 60
            }
          }
        }
      )
    );

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/back2.jpg")}
          style={styles.backImage}
        >
          <View style={styles.topHeader}>
            <View style={styles.back} />
            <View style={styles.heading}>
              <Text style={styles.headerText}>Events</Text>
            </View>
            <View style={styles.waveContainer}>
              <Image
                source={require("../assets/wave2.png")}
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
    backgroundColor: "#fff",
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
    color: "#222",
    fontSize: 18,
    width: 170
  },
  mblTxt: {
    color: "#777",
    fontSize: 13
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  msgTxt: {
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
    resizeMode: "contain",
    height: 10,
    width: screenWidth / 5
  },
  waveContainer: {
    marginLeft: 20,
    justifyContent: "flex-end"
  },
  main: {
    flex: 8,
    maxHeight: 600
  },
  back: {
    height: 40,
    width: 40
  }
});
