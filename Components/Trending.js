import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as firebase from "firebase";
import { Card } from "react-native-card-stack-swiper";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Text from "./customText";
import EventData from "./EventData";

import { Ionicons } from "@expo/vector-icons";
import track from "../Data/Amplitude";

import firebaseConfig from "../Data/config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class Trending extends Component {
  constructor() {
    super();
    this.state = {
      all: [],
      loading: true
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.navigation.addListener("didFocus", payload => {
      track(this.props.navigation.state.routeName);
    });

    firebase
      .database()
      .ref("/events")
      .on("value", async snapshot => {
        let snap = await JSON.stringify(snapshot);
        let data = JSON.parse(snap);
        let all = [];
        for (var key in data) {
          let obj = data[key];
          if (obj.type != "W") all.push(obj);
        }
        let myData = []
          .concat(all)
          .sort((a, b) => a.likeCount < b.likeCount)
          .slice(0, 10);
        this.setState({ all: myData, loading: false });
      });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ borderRadius: 10 }}
        onPress={() => {
          this.props.navigation.navigate("EventData", { data: item });
          track(item.eventName, { View: true });
        }}
      >
        <Card style={styles.card}>
          <View style={styles.row}>
            <Image source={{ uri: item.posterUrl }} style={styles.pic} />

            <View
              style={{
                flex: 1,
                marginLeft: -10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF"
              }}
            >
              <View>
                <Text style={styles.text}>{item.eventName}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <Ionicons name="ios-heart" style={styles.msgTxt} />
              <Text style={[styles.msgTxt, { marginLeft: 5 }]}>
                {item.likeCount}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/backPurple.png")}
          style={styles.backImage}
        >
          <View style={styles.topHeader}>
            <View style={styles.back} />
            <View style={styles.heading}>
              <Text style={styles.headerText}>Trending</Text>
            </View>
            <View style={styles.waveContainer}>
              <Image
                source={require("../assets/wave2.png")}
                style={styles.wave}
              />
            </View>
          </View>
          {this.state.loading ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <ActivityIndicator
                size="large"
                color="#fff"
                style={{
                  flex: 4,
                  marginTop: 20,
                  alignSelf: "center"
                }}
                renderItem={this.renderItem}
              />
            </View>
          ) : (
            <View style={styles.main}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.all}
                keyExtractor={item => {
                  return item.id.toString();
                }}
                renderItem={this.renderItem}
                style={{
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10
                }}
              />
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }
}
const AppSwitchNavigator = createStackNavigator(
  {
    Trending: Trending,
    EventData: EventData
  },
  {
    headerMode: "none",
    mode: "card",
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    marginVertical: 20,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    width: screenWidth - 50,
    height: screenHeight / 7,
    elevation: 11
  },
  pic: {
    flex: 1.5,
    borderRadius: 10,
    backgroundColor: "#D3D3D3"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    backgroundColor: "#fff",
    textAlignVertical: "center",
    textAlign: "center"
  },
  msgTxt: {
    color: "red",
    fontSize: screenHeight > 600 ? 17 : 14
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

  wave: {
    alignSelf: "flex-start",
    resizeMode: "contain",
    marginTop: 10,
    height: 10,
    width: screenWidth / 5
  },
  waveContainer: {
    marginLeft: 20,
    justifyContent: "flex-end"
  },
  main: {
    flex: 8,
    alignItems: "center"
  },
  back: {
    height: 40,
    width: 40
  }
});
