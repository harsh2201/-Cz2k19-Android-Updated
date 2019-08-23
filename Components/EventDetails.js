import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class EventDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>EventDetail</Text>
      </View>
    );
  }
}
export default EventDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
