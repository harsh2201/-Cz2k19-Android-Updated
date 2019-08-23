import * as React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { BottomNavigation, Paragraph } from "react-native-paper";
import Options from "./Components/Options";
import Navigator from "./Components/Navigator";
import About from "./Components/About";
import Trending from "./Components/Trending";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCpsdNSarpuc8Cb3GHcHjbPYvfBeim2JkY",
  authDomain: "cognizance2k19-169d7.firebaseapp.com",
  databaseURL: "https://cognizance2k19-169d7.firebaseio.com",
  projectId: "cognizance2k19-169d7",
  storageBucket: "",
  messagingSenderId: "656512761398",
  appId: "1:656512761398:web:d5221d4e8653cd22"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  componentDidMount() {
    firebase
      .auth()
      .signInAnonymously()
      .then(async () => {
        let user = await firebase.auth().currentUser;
        firebase
          .database()
          .ref("users/" + user.uid + "/")
          .set({
            email: "NA",
            id: user.uid,
            like_left: 5,
            user_no: 3
          });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;

        console.log(user);
      } else {
        // console.log("no in")
      }
    });
  }
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
        shifting={true}
        labeled={false}
        activeColor="#80007d"
        barStyle={{ backgroundColor: "#fff" }}
        renderScene={BottomNavigation.SceneMap({
          navigator: Options,
          Trending: Trending,
          events: Navigator,
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
