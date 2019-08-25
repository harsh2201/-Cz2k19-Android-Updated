import React, { Component } from "react";
import { View, Text, StyleSheet, Easing, Animated } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import EventDetails from "./EventDetails";
import Events from "./Events";
import Contact from "./Contact";
import Options from "./Options";
import EventStack from "./EventStack";

const AppSwitchNavigator = createStackNavigator(
  {
    Options: Options,
    Events: Events,
    EventStack: props => <EventStack {...props} user={this.props.user} />,
    EventDetails: EventDetails,
    Contact: Contact
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
