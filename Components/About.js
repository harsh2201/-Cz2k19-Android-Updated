import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>About</Text>
      </View>
    );
  }
}
export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
