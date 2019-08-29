import * as React from "react";
import { StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { BottomNavigation } from "react-native-paper";
import Options from "./Components/Options";
import Navigator from "./Components/Navigator";
import AboutCZ from "./Components/AboutCZ";
import Trending from "./Components/Trending";
import * as firebase from "firebase";
import { Font } from "expo";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

import firebaseConfig from "./Data/config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = ["Setting a timer"];
  }

  async componentDidMount() {
    await Font.loadAsync({
      lexendDeca: require("./assets/fonts/LexendDeca-Regular.ttf")
    });
    this.setState({ fontLoaded: true });

    firebase
      .auth()
      .signInAnonymously()
      .then(async () => {
        let user = await firebase.auth().currentUser;
        const ref = firebase.database().ref("users/" + user.uid + "/");
        const uRef = firebase.database().ref("users/");
        let i = 0;
        uRef.on("value", snap => {
          snap.forEach(() => {
            i++;
          });
        });
        ref.once("value").then(snap => {
          if (snap.val() == null) {
            i--;
            ref.set({
              email: "NA",
              id: user.uid,
              like_left: 5,
              user_no: i
            });
            this.setState({
              user: {
                email: "NA",
                id: user.uid,
                like_left: 5,
                user_no: i
              }
            });
          }
        });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  state = {
    user: {},
    index: 0,
    routes: [
      {
        key: "events",
        icon: "home"
        },
      {
        key: "Trending",
        icon: "whatshot"
        },
      {
        key: "navigator",
        icon: "code"
        },
      {
        key: "about",
        icon: "info"
      }
    ],
    fontLoaded: false
  };

  render() {
    if (!this.state.fontLoaded)
      return (
        <ActivityIndicator
          style={{ flex: 1, alignSelf: "center" }}
          size="large"
        />
      );
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={index => this.setState({ index })}
        activeColor="#202c92"
        labeled={false}
        barStyle={{
          backgroundColor: "#fff",
          height: HEIGHT > 600 ? HEIGHT / 13 : HEIGHT / 12
        }}
      renderScene={BottomNavigation.SceneMap(
          {
            navigator: Options,
            Trending: Trending,
            events: props => <Navigator {...props} user={this.state.user} />,
            about: AboutCZ
          },
          {
            initialRouteName: "navigator",
            activeTintColor: "rgb(0, 114, 255)",
            activeColor: "#f0edf6",
            navigationOptions: {
              tabBarVisible: true
            }
          }
        )}
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
