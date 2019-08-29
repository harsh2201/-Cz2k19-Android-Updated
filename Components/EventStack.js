import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import Toast from "react-native-whc-toast";

import { Constants } from "expo";
import Text from "./customText";
import { Ionicons } from "@expo/vector-icons";

import * as firebase from "firebase";
import firebaseConfig from "../Data/config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

var uid = "";

export default class EventStack extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      count: 0,
      user: {}
    };
  }

  async componentDidMount() {
      uid = await firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("/users/" + uid)
      .once("value")
      .then(async snapshot => {
        let snap = await JSON.stringify(snapshot);
        let uObj = JSON.parse(snap);
          this.setState({
          user: uObj
        });
      })
      .catch(err => console.log(err));
  }

  renderCard = () => {
    const { navigation } = this.props;
    let data = navigation.getParam("data");
    let rounds = navigation.getParam("rounds");

    return data.map((item, i) => {
      return (
        <Card key={i} style={[styles.card, styles.card1]}>
          <Image
            style={styles.image}
            source={{
              uri: item.posterUrl
            }}
          />
          <View style={{ marginTop: -10, backgroundColor: "#fff" }}>
            <Text style={styles.label}>{item.eventName}</Text>
            <Text style={styles.desc}>{item.shortDescription}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>₹ {item.price}</Text>
            <Text style={styles.info}>{item.department}</Text>
          </View>
          <View style={styles.infoContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("EventData", {
                  data: item,
                  rounds: rounds[item.eventName]
                });
              }}
              style={styles.knowMoreContainer}
            >
              <Text style={styles.knowMore}>Know More</Text>
            </TouchableOpacity>
          </View>
        </Card>
      );
    });
  };

  like = async item => {
    const { navigation } = this.props;
    let data = navigation.getParam("data");
    let like_left = this.state.user.like_left;
    let like = 0;
    if (like_left > 0) {
      await firebase
        .database()
        .ref("events/" + data[item].eventName + "/likeCount")
        .once("value")
        .then(snap => {
          like = snap.val();
          like = like + 1;
          data[item].likeCount = like;
          firebase
            .database()
            .ref("events/" + data[item].eventName + "/")
            .set(data[item]);
          like_left--;
          let uObj = this.state.user;
          uObj.like_left = like_left;
          this.setState({
            user: uObj
          });
          firebase
            .database()
            .ref("/users/" + uid + "/like_left")
            .set(like_left);
        });
    } else {
      this.refs.toast.showBottom("You have exceeded the likes limit");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/backPurple.png")}
          style={styles.background}
        />
        <TouchableOpacity
          style={{
            marginTop: HEIGHT / 20,
            marginLeft: HEIGHT / 40,
            height: 40,
            width: 40,
            borderRadius: 10
          }}
          onPress={() => {
            this.props.navigation.navigate("Events");

          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10
            }}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.foreground}>
          <CardStack
            style={styles.content}
            disableBottomSwipe
            disableTopSwipe
            secondCardZoom={1.05}
            onSwipedRight={this.like}
            ref={swiper => {
              this.swiper = swiper;
            }}
          >
            {this.renderCard()}
          </CardStack>
          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.red]}
                onPress={() => {
                  this.swiper.swipeLeft();
                }}
              >
                <Text style={styles.buttonText}>Nahh </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => {
                  this.swiper.swipeRight();
                }}
              >
                <Text style={styles.buttonText}>Like! </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Toast ref="toast" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2"

  },
  foreground: {
    flex: 1,
    alignItems: "center",
    marginTop: 0,
    justifyContent: "center"
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  content: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: HEIGHT / 10
  },
  image: {
    flex: 6,
    height: "70%",
    width: "100%",
    borderRadius: 10
  },
  card: {
    width: WIDTH - 50,
    height: HEIGHT > 600 ? HEIGHT / 1.5 : HEIGHT / 1.5,
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  knowMoreContainer: {
    width: "45%",
    height: HEIGHT < 800 ? "70%" : "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0066c0",
    borderRadius: 30
  },
  knowMore: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 0

  },
  info: {
    color: "#0d8f73",
    fontSize: HEIGHT < 600 ? 18 : 24
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 20
  },
  desc: {
    textAlign: "center",
    fontSize: HEIGHT < 600 ? 11 : 15,
    marginTop: 1,
    color: "#777777"
  },
  label: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: HEIGHT < 600 ? 19 : 25,
    marginTop: 17,
    color: "#000",
    marginBottom: 10
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
    marginTop: HEIGHT < 600 ? 70 : 90
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  button: {
    borderRadius: 3.4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    width: "100%"
  },
  buttonText: {
    color: "#fff"
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: "rgb(246,190,66)",
    borderWidth: 4,
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 100,
    height: "75%",
    backgroundColor: "#00b23b"
  },
  red: {
    width: 100,
    height: "75%",
    backgroundColor: "#ff4346"
  }
});
