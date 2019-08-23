import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  Image
} from "react-native";
import Images from "react-native-remote-svg";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as firebase from "firebase";
import { Card } from "react-native-card-stack-swiper";

import { Ionicons } from "@expo/vector-icons";

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

class Trending extends Component {
  constructor() {
    super();
    this.state = {
      all: []
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("/events")
      .once("value")
      .then(async snapshot => {
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

        this.setState({ all: myData });
      })
      .catch(err => console.log(err));
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("", { data: item })}
      >
        <Card style={styles.card}>
          <View style={styles.row}>
            <Image source={require("../assets/baap2.jpg")} style={styles.pic} />

            <Text style={styles.text}>{item.eventName}</Text>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "flex-end",
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
          source={require("../assets/back2.jpg")}
          style={styles.backImage}
        >
          <View style={styles.topHeader}>
            <View style={styles.back} />
            <View style={styles.heading}>
              <Text style={styles.headerText}>Trending</Text>
            </View>
            <View style={styles.waveContainer}>
              <Images
                source={require("../assets/wave.svg")}
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
            />
          </View>
        </ImageBackground>
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
    width: 320,
    height: 100,
    elevation: 11,
    justifyContent: "center"
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60
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
  text: {
    fontSize: 15,
    padding: 5
  },
  msgTxt: {
    fontWeight: "500",
    // color: "#008B8B",
    color: "red",
    fontSize: 25
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
    flex: 4,
    alignItems: "center"
    // justifyContent:"center",
  },
  back: {
    height: 40,
    width: 40
  }
});
