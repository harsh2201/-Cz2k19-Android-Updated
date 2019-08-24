import React, { Component } from "react";
import { View, Text, StyleSheet, Easing, Animated } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import EventDetails from "./EventDetails";
import Events from "./Events";
import Contact from "./Contact";
import Options from "./Options";
import EventStack from "./EventStack";

const AppSwitchNavigator = createStackNavigator(
  {  Events: Events,
    EventStack: EventStack,
    Options: Options,
    EventDetails: EventDetails,
    Contact: Contact
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 350,
    //     timing: Animated.timing
    //   },
    //   screenInterpolator: sceneProps => {
    //     const { position, layout, scene, index, scenes } = sceneProps;

    //     const thisSceneIndex = scene.index;
    //     const height = layout.initHeight;
    //     const width = layout.initWidth;

    //     var thisSceneParams = scene.route.params || {};

    //     const translateX = position.interpolate({
    //       inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //       outputRange: [width, 0, 0]
    //     });

    //     const translateY = position.interpolate({
    //       inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //       outputRange: [height, 0, 0]
    //     });

    //     const opacity = position.interpolate({
    //       inputRange: [
    //         thisSceneIndex - 1,
    //         thisSceneIndex - 0.5,
    //         thisSceneIndex
    //       ],
    //       outputRange: [0, 1, 1]
    //     });

    //     const scale = position.interpolate({
    //       inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //       outputRange: [4, 1, 1]
    //     });

    //     const slideFromRight = { transform: [{ translateX }] };
    //     const scaleWithOpacity = {
    //       opacity,
    //       transform: [{ scaleX: scale }, { scaleY: scale }]
    //     };
    //     const slideInFromBottom = { transform: [{ translateY }] };
    //     return scaleWithOpacity;
    //   }
    // })
  }
);

export default (AppNavigator = createAppContainer(AppSwitchNavigator));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
