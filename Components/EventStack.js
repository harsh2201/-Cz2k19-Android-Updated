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
import Images from "react-native-remote-svg";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default class EventStack extends Component {
  constructor() {
    super();
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/14.jpg")} style={styles.background} />
        <View style={styles.foreground}>
          <CardStack
            style={styles.content}
            disableBottomSwipe
            disableTopSwipe
            secondCardZoom={1.05}
            onSwipedLeft={z => console.log(z)}
            onSwipedRight={() => console.log("onSwipedRight")}
            ref={swiper => {
              this.swiper = swiper;
            }}
          >
            {this.state.data.map((item, i) => {
              return (
                <Card style={[styles.card, styles.card1]}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201905/sg.jpeg?xhFi8FNEIPVm8v1Xd5dPcyb9r6tQicc7"
                    }}
                  />
                  <Text style={styles.label}>Event Title 1</Text>
                  <Text style={styles.desc}>
                    One thing I don't know why It doesn't even matter how hard
                    you try Keep that in mind I designed this rhyme when I was
                    obsessed with time All I know, time was just slipping way
                  </Text>
                </Card>
              );
            })}
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
    width: "100%"
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center"
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
  desc: {
    flex: 2,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 1,
    color: "#777777",
    backgroundColor: "transparent"
  },
  label: {
    flex: 1,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
    marginTop: 17,
    color: "#000",
    backgroundColor: "transparent"
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
