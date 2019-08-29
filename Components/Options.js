import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Platform,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Easing,
  Animated,
  Dimensions
} from "react-native";
import Contact from "./Contact";
import Representative from "./Representative";
import About from "./About";
import { createAppContainer, createStackNavigator } from "react-navigation";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import Text from "./customText";

import * as data from "../Data/data";

class Options extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/back2.jpg")}
          style={styles.backImage}
        >
          <View style={styles.main}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Contact");
              }}
            >
              <Text style={styles.text}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Faculty");
              }}
            >
              <Text style={styles.text}>Faculty Representatives</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Student");
              }}
            >
              <Text style={styles.text}>Student Representatives</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AppDevelopers");
              }}
            >
              <Text style={styles.text}>App Developers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("WebDevelopers");
              }}
            >
              <Text style={styles.text}>Web Developers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Campaign");
              }}
            >
              <Text style={styles.text}>Campaigning Zone Leaders</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const AppSwitchNavigator = createStackNavigator(
  {
    Options: props => <Options {...props} />,
    AppDevelopers: props => (
      <About {...props} heading={"App Developers"} egg={true} data={data.app} />
    ),
    Faculty: props => (
      <About
        {...props}
        egg={false}
        heading={"Faculty Representatives"}
        data={data.faculty}
      />
    ),
    Contact: props => <Contact {...props} heading={"Contact Us"} />,
    Student: props => (
      <About
        egg={false}
        {...props}
        heading={"Student Representatives"}
        data={data.student}
      />
    ),

    WebDevelopers: props => (
      <About {...props} heading={"Web Developers"} egg={true} data={data.web} />
    ),
    Campaign: props => (
      <About
        {...props}
        heading={"Zone Leaders"}
        egg={false}
        data={data.campaign}
      />
    )
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    marginTop: 10
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    alignSelf: "center"
  },
  modalContentTitle: {
    flex: 2,
    fontSize: 30,
    justifyContent: "flex-start",
    alignSelf: "center",
    marginTop: 20,
    textAlign: "center",
    textAlignVertical: "center"
  },
  modalContentCode: {
    flex: 6,
    fontSize: 40,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#F36234"
  },
  modalContentInst: {
    justifyContent: "flex-start",
    flex: 4,
    fontSize: 30,
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "top"
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
    flexDirection: "column",
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
    marginTop: 6,
    marginLeft: 15,
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
  text: {
    color: "#fff",
    fontSize: screenHeight > 600 ? 22 : 20,
    textAlignVertical: "center",
    textAlign: "left",
    marginTop: 23
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
    marginTop: 30,
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
    flex: 8,
    padding: 10,
    marginLeft: 50,
    justifyContent: "center"
    },
  back: {
    height: 40,
    width: 40,
    backgroundColor: "#00000077",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 50
  }
});
