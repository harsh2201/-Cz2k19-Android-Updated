import * as React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { BottomNavigation, Paragraph } from "react-native-paper";
import Events from "./Components/Events";
import Navigator from "./Components/Navigator";
import About from "./Components/About";
import Trending from "./Components/Trending";

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      {
        key: "events",
        // title: "Events",
        icon: "home"
        // color: "#039b3b"
      },
      {
        key: "Trending",
        // title: "Options",
        icon: "whatshot"
        // color: "#E81B38"
      },
      {
        key: "navigator",
        // title: "Options",
        icon: "favorite"
        // color: "#E81B38"
      },
      {
        key: "about",
        // title: "About CZ",
        icon: "person"
        // color: "#F75728"
      }
    ]
  };

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={index => this.setState({ index })}
        shifting={false}
        labeled={false}
        activeColor="#80007d"
        barStyle={{ backgroundColor: "#fff" }}
        renderScene={BottomNavigation.SceneMap({
          navigator: Navigator,
          Trending:Trending,
          events: Events,
          about: About
        })}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
