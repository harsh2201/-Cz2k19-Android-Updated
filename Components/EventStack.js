import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import Toast from "react-native-whc-toast";

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
      .on("value", async snapshot => {
        let snap = await JSON.stringify(snapshot);
        let uObj = JSON.parse(snap);

        // for (var key in data) {
        //   let obj = data[key];
        //   uObj.push(obj);
        // }
        console.log(uObj);
        this.setState({
          user: uObj
        });
      })
      .catch(err => console.log(err));

    // this.setState({
    //   user: user
    // });
    // let arr = [];
    // let flag = 0;
    // let data = this.state.data;
    // let i = 0;
    // for (k in data) {
    //   if (data[k].id === item.id) {
    //     flag = 1;
    //   }
    //   if (flag === 1) {
    //     arr[i] = data[k];
    //     i++;
    //   }
    // }
  }

  renderCard = () => {
    const { navigation } = this.props;
    let data = navigation.getParam("data");
    return data.map((item, i) => {
      return (
        <Card key={i} style={[styles.card, styles.card1]}>
          <Image
            style={styles.image}
            source={{
              uri: item.posterUrl
            }}
          />
          <Text style={styles.label}>{item.eventName}</Text>
          <Text style={styles.desc}>{item.eventDescription}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{item.price}</Text>
            <Text style={styles.info}>{item.department}</Text>
          </View>
          <View style={styles.infoContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("EventData", {
                  data: item
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

  like = item => {
    // console.log(item);
    const { navigation } = this.props;
    let data = navigation.getParam("data");
    // console.log("Data item", this.state.user.like_left);
    let like_left = this.state.user.like_left;
    let like = 0;
    if (like_left > 0) {
      firebase
        .database()
        .ref("events/" + data[item].eventName + "/likeCount")
        .on("value", snap => {
          like = snap.val();
          like = like + 1;
          data[item].likeCount = like;
          firebase
            .database()
            .ref("events/" + data[item].eventName + "/")
            .set(data[item]);
          like_left--;
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
        {/* <Image source={require("../assets/14.jpg")} style={styles.background} /> */}
        <View style={styles.foreground}>
          <CardStack
            style={styles.content}
            disableBottomSwipe
            disableTopSwipe
            onSwiped={this.like}
            secondCardZoom={1.05}
            // onSwipedLeft={z => console.log(z)}
            // onSwipedRight={() => console.log("onSwipedRight")}
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
                <Text style={styles.buttonText}>MAYBE </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => {
                  this.swiper.swipeRight();
                }}
              >
                <Text style={styles.buttonText}>I LIKE THIS </Text>
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
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center",
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
    justifyContent: "flex-end"
  },
  image: {
    flex: 4,
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  card: {
    width: 320,
    height: 575,
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
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0066c0",
    borderRadius: 30
  },
  knowMore: {
    color: "#fff",
    fontSize: 15
  },
  info: {
    color: "#0d8f73",
    fontWeight: "500",
    fontSize: 24
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  desc: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 1,
    color: "#777777"
    // backgroundColor: "#777777"
  },
  label: {
    // flex: 1,
    // height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    fontWeight: "500",
    marginTop: 17,
    color: "#000",
    marginBottom: 10
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between"
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
    color: "#fff",
    fontWeight: "700"
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
