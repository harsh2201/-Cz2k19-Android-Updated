import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import { Card } from "react-native-card-stack-swiper";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
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

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tech: [],
      non: [],
      work: [],
      loading: true,
      disabled: false
    };
  }
  async componentDidMount() {
    // this.props.navigate("Events");
    let page = this.props.navigation.state.key;
    if (page == "Technical" || page == "Nontechnical") {
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
          } else if (page == "Nontechnical") {
            this.setState({ data: non });
          }
        })
        .catch(err => console.log(err));
    }
    if (page == "Workshops") {
      this.setState({
        disabled: true
      });
      firebase
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
        })
        .catch(err => console.log(err));
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
        disabled={this.state.disabled}
        onPress={async () => {
          let curr = await this.calc(item);
          this.props.navigate("EventStack", {
            data: curr
          });
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
            <View style={styles.msgContainer}>
              <Ionicons name="ios-heart" style={styles.msgTxt} />
              <Text style={[styles.msgTxt, { marginLeft: 5 }]}>
                {item.likeCount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      // <MainCard data={this.state.data} renderItem={this.renderItem} />
      // <View style={styles.main}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.listContainer}>
            <FlatList
              style={{}}
              showsVerticalScrollIndicator={false}
              // extraData={this.state}
              data={this.state.data}
              keyExtractor={item => {
                return item.id.toString();
              }}
              renderItem={this.renderItem}
            />
          </View>
        </Card>
      </View>
      // </View>
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
    maxHeight: 600
  },
  card: {
    width: 320,
    minHeight: 500,
    // height: 600,
    marginTop: 30,
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
    marginTop: 10,
    maxHeight: 500
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
    height: 60
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    width: 170
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  msgTxt: {
    fontWeight: "400",
    // color: "#008B8B",
    color: "red",
    fontSize: 12,
    marginLeft: 15
  }
});
