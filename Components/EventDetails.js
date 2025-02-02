import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import { Card } from "react-native-card-stack-swiper";
import { Ionicons } from "@expo/vector-icons";
import Text from "./customText";
import track from "../Data/Amplitude";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as firebase from "firebase";
import firebaseConfig from "../Data/config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tech: [],
      non: [],
      work: [],
      rounds: [],
      loading: true,
      disabled: false
    };
  }
  async componentDidMount() {
    this.setState({ loading: true });

    let page = this.props.navigation.state.key;

    if (page == "Technical" || page == "Non Technical") {
      this.setState({
        disabled: false
      });
      firebase
        .database()
        .ref("/events")
        .on("value", async snapshot => {
          let snap = await JSON.stringify(snapshot);
          let data = JSON.parse(snap);
          let tech = [];
          let non = [];
          for (var key in data) {
            let obj = data[key];
            if (obj.type == "T") {
              tech.push(obj);
            } else if (obj.type == "NT") {
              non.push(obj);
            }
          }
          if (page == "Technical") {
            this.setState({ data: tech });
          } else if (page == "Non Technical") {
            this.setState({ data: non });
          }
          await this.setState({ loading: false });
        });
      firebase
        .database()
        .ref("/rounds")
        .on("value", async snapshot => {
          let snap = await JSON.stringify(snapshot);
          let data = JSON.parse(snap);
          let rounds = [];
          for (var key in data) {
            let obj = data[key];
            rounds.push(obj);
          }
          this.setState({ rounds: data });
        });
    }
    if (page == "Workshops") {
      this.setState({
        disabled: true
      });
      await firebase
        .database()
        .ref("/workshops")
        .on("value", async snapshot => {
          let snap = await JSON.stringify(snapshot);
          let data = JSON.parse(snap);
          let work = [];

          for (var key in data) {
            let obj = data[key];
            work.push(obj);
          }
          this.setState({ data: work });
          await this.setState({ loading: false });
        });
    }
  }

  calc = item => {
    let data = this.state.data;
    let arr1 = [],
      arr2 = [],
      arr3 = [],
      flag = 0;
    for (k in data) {
      if (data[k].id === item.id) {
        flag = 1;
      }
      if (flag === 1) {
        arr1.push(data[k]);
      } else {
        arr2.push(data[k]);
      }
    }
    arr3 = arr1.concat(arr2);
    return arr3;
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          track(item.eventName, { "View": true });
          let curr = await this.calc(item);
          {
            !this.state.disabled
              ? this.props.navigate("EventStack", {
                  data: curr,
                  rounds: this.state.rounds
                })
              : this.props.navigate("EventData", {
                  data: item
                });
          }
        }}
      >
        <View style={styles.row}>
          <Image
            source={{
              uri:
                item.posterUrl != ""
                  ? item.posterUrl
                  : "http://bit.ly/CZSatvikAvatar"
            }}
            style={styles.pic}
          />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.eventName}
              </Text>
            </View>
            {this.state.disabled ? (
              <View style={styles.msgContainer} />
            ) : (
              <View style={styles.msgContainer}>
                <Ionicons name="ios-heart" style={styles.msgTxt} />
                <Text style={[styles.msgTxt, { marginLeft: 5 }]}>
                  {item.likeCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    if (this.state.loading === true)
      return (
        <View style={[styles.main, { alignItems: "center" }]}>
          <View style={styles.cardContainer}>
            <Card style={[styles.card]}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  style={{ marginTop: 20 }}
                />
                <Image
                  source={require("../assets/loader2.png")}
                  style={{
                    flex: 0.8
                  }}
                  resizeMode="contain"
                />
              </View>
            </Card>
          </View>
        </View>
      );

    return (
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.listContainer}>
            <FlatList
              style={{ marginBottom: HEIGHT / 14 }}
              showsVerticalScrollIndicator={false}
              data={this.state.data}
              keyExtractor={item => {
                return item.id.toString();
              }}
              renderItem={this.renderItem}
            />
          </View>
        </Card>
      </View>
    );
  }
}
export default EventDetail;

const styles = StyleSheet.create({
  main: {
    flex: 4,
    maxHeight: 600
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  card: {
    width: screenWidth - 40,
    flex: 1,
    top: screenHeight / 14,
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11
  },
  listContainer: {
    marginTop: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 15
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "#D3D3D3"
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280
  },
  nameTxt: {
    marginLeft: 15,
    color: "#222",
    fontSize: screenHeight > 600 ? 20 : 16,
    width: 170
  },
  mblTxt: {
    color: "#777",
    marginTop: 3,
    fontSize: 13
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  msgTxt: {
    color: "red",
    fontSize: screenHeight > 600 ? 12 : 10,
    marginTop: 3,
    marginLeft: 15
  }
});
