import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Platform,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as firebase from "firebase";
import { Card } from "react-native-card-stack-swiper";
import Text from "./customText";

import { Ionicons } from "@expo/vector-icons";

import firebaseConfig from "../Data/config";
// Initialize Firebase
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
    // console.log("Props from Trending", this.props.sProps);
    this.setState({ loading: true });
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
      style={{borderRadius: 10}}
        onPress={() =>
          this.props.sProps.navigation.navigate("EventData", { data: item })
        }
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
            <View >
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
      {this.state.loading ? <View style={{flex: 1,  backgroundColor: "#000", justifyContent: "center", alignItems: "center"}} ><Image style={{ resizeMode: "center", backgroundColor: "#000"}} source={require("../assets/preLoader.gif")} /></View> :
        <ImageBackground
          source={require("../assets/back2.jpg")}
          style={styles.backImage}
        >
          <View style={styles.topHeader}>
            <View style={styles.back} />
            <View style={styles.heading}>
              <Text style={styles.headerText}>Trending</Text>
            </View>
            <View style={styles.waveContainer}>
              <Image
                source={require("../assets/wave.png")}
                style={styles.wave}
              />
            </View>
          </View>
          <View style={styles.main}>
              <FlatList
                showsVerticalScrollIndicator={false}
                // extraData={this.state}
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
        </ImageBackground>}
      </View>
    );
  }
}
export default Trending;

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
    // justifyContent: "center",
  },
  pic: {
    flex: 1.5,
    // borderRadius: 30,
    // width: 60,
    // height: 60,
    // borderBottomLeftRadius: 10,
    // borderTopLeftRadius: 10
    borderRadius:10
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    // borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderRadius: 20,
    // borderBottomWidth: 1,
    // padding: 10,
    // marginHorizontal: 15,
  },
  text: {
    // flex: 1,
    fontSize: 15,
    textAlign: "center",
    backgroundColor: "#fff",
    textAlignVertical: "center",
    textAlign: "center"
  },
  msgTxt: {
    //fontWeight: "500",
    // color: "#008B8B",
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
    marginTop: 10,
    justifyContent: "flex-end"
  },
  waveContainer: {
    marginLeft: 20,
    justifyContent: "flex-end"
  },
  main: {
    flex: 8,
    alignItems: "center"
    // justifyContent:"center",
  },
  back: {
    height: 40,
    width: 40
  }
});
