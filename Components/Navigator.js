import React, { Component } from "react";
import { View, Text, StyleSheet, Easing, Animated } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import EventDetails from "./EventDetails";
import Events from "./Events";
import Contact from "./Contact";
import Options from "./Options";
import EventStack from "./EventStack";

export default class Navigator extends Component {
  constructor() {
    super();
  }

  render() {
    return <AppNavigator />;
  }
}

const AppSwitchNavigator = createStackNavigator(
  {
    Events: Events,
    Options: Options,
    EventStack: props => <EventStack {...props} />,
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

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
