import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Events extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Events</Text>
      </View>
    );
  }
}
export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
