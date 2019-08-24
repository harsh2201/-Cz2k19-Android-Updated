import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions
} from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
class Events extends Component {
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/back1.jpg")}
          style={styles.backImage}
        >
          <View style={styles.topHeader}>
            <View style={styles.back} />
            <View style={styles.heading}>
              <Text style={styles.headerText}>About CZ</Text>
            </View>
            <View style={styles.waveContainer}>
              <Image
                source={require("../assets/wave.png")}
                style={styles.wave}
              />
            </View>
          </View>
          <View style={styles.main}>
            <Text style={styles.text}>
              Cognizance is one of the most prominent technical fests of
              Gujarat. Since its inception in 2007, it aims to provide a
              platform full of opportunities to learn and experiment with the
              canvas of life and to paint whatever agitates the sleep of
              enthusiastic youth populace of India. It has been witnessing a new
              zenith of techno-management events ranging from raging robotics to
              corporate module to inspiring lecture series to awe striking
              workshops and much more. It has served as a distinguished platform
              for entrepreneurs, innovators and technocrats to showcase their
              abilities as every edition has sought to take a leap forward in
              redefining and revolutionizing the technology. Cognizance 2019
              heartily welcomes you all to be a part of this journey. Dream.
              Explore. Innovate.
            </Text>
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
  text: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 25
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
    flex: 6,
    padding: 20
  },
  back: {
    height: 40,
    width: 40
  }
});
