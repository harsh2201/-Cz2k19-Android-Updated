import * as React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { BottomNavigation, Paragraph } from "react-native-paper";

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      {
        key: "home",
        title: "Home",
        icon: "home"
        // color: "#039b3b"
      },
      {
        key: "favorites",
        title: "Favorites",
        icon: "favorite"
        // color: "#E81B38"
      },
      {
        key: "profile",
        title: "Profile",
        icon: "person"
        // color: "#F75728"
      },
      {
        key: "aboutUs",
        title: "About Us",
        icon: "info"
        // color: "#000"
      }
    ]
  };

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={index => this.setState({ index })}
        renderScene={BottomNavigation.SceneMap({
          home: () => {
            return (
              <View style={styles.content}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
          favorites: () => {
            return (
              <View style={[styles.content]}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30
                  }}
                >
                  Favourites
                </Text>
              </View>
            );
          },
          profile: () => {
            return (
              <View style={[styles.content]}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
          aboutUs: () => {
            return (
              <View style={[styles.content, { backgroundColor: "#000" }]}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                    color: "#fff"
                  }}
                >
                  About Us
                </Text>
              </View>
            );
          }
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
