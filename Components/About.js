import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import MainCard from "./MainCard";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import Text from "./customText";
import * as firebase from "firebase";
import firebaseConfig from "../Data/config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const HEIGHT = Dimensions.get("window").height;

class About extends Component {
  constructor(props) {
    super(props);
    circleTransition = () => {};
    this.state = {
      message: "Hello",
      code: "",
      inst: "",
      isModalVisible: false,
      customLeftMargin: 0,
      customTopMargin: 0,
      counter: 0,
      tempProp: {
        user_no: -1,
        code: ""
      }
    };
  }

  async componentDidMount() {
    let user = await firebase.auth().currentUser;
    await firebase
      .database()
      .ref("users/" + user.uid + "/")
      .once("value", async snapshot => {
        let snap = await JSON.stringify(snapshot);
        let data = JSON.parse(snap);
        this.setState({
          tempProp: data
        });

        let t = this.state.tempProp;

        await firebase
          .database()
          .ref("prize/" + t.user_no)
          .once("value", async snapshot2 => {
            if (t.user_no % 100 === 0 && t.user_no <= 1000) {
              this.setState({
                message: "Congratulations!\nYou just won a luckty prize",
                code: snapshot2.val(),
                inst: "Ensure to collect the prize from the coordinators"
              });
            } else {
              this.setState({
                code: "Sorry!\nYou didn't get the prize",
                message: "",
                inst: ""
              });
            }
          });
      });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: true });
    setTimeout(() => {
      this.setState({ isModalVisible: false });
    }, 3000);
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity disabled={!this.props.egg} onPress={this.toggleModal}>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/back1.jpg")}
          style={styles.backImage}
        >
          <View style={styles.topHeader}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => {
                this.props.navigation.navigate("Options");
              }}
            >
              <Ionicons name="ios-arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.heading}>
              <Text style={styles.headerText}>{this.props.heading}</Text>
            </View>
            <View style={styles.waveContainer}>
              <Image
                source={require("../assets/wave2.png")}
                style={styles.wave}
              />
            </View>
          </View>
          <MainCard
            data={this.props.data}
            renderItem={this.renderItem}
            exraData={this.state}
            // egg={this.props.egg}
          />
          <Modal
            isVisible={this.state.isModalVisible}
            backdropColor="#B4B3DB"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            style={styles.modalContent}
          >
            <View>
              <Text style={styles.modalContentTitle}>{this.state.message}</Text>
              <Text style={styles.modalContentCode}>{this.state.code}</Text>
              <Text style={styles.modalContentInst}>{this.state.inst}</Text>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    );
  }
}
export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    marginTop: 10
  },
  modalContent: {
    height: screenHeight / 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    alignSelf: "center"
  },
  modalContentTitle: {
    fontSize: 30,
    justifyContent: "flex-start",
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center"
  },
  modalContentCode: {
    fontSize: 40,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#F36234"
  },
  modalContentInst: {
    justifyContent: "flex-start",
    fontSize: 30,
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "top"
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
    fontSize: HEIGHT > 600 ? 18 : 15,
    width: 170
  },
  mblTxt: {
    color: "#777",
    fontSize: HEIGHT > 600 ? 13 : 11
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  msgTxt: {
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15
  },
  headerText: {
    color: "#fff",
    fontSize: 25
  },
  topHeader: {
    flex: 2.2
  },
  heading: {
    marginTop: 10,
    marginLeft: 20
  },
  backImage: {
    flex: 1
  },
  card: {
    width: 320,
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    top: HEIGHT / 20,
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
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  wave: {
    alignSelf: "flex-start",
    marginTop: 10,
    resizeMode: "contain",
    height: 10,
    width: screenWidth / 5
  },
  waveContainer: {
    marginLeft: 20,
    justifyContent: "flex-end"
  },
  main: {
    flex: 8
  },
  back: {
    height: 40,
    width: 40,
    backgroundColor: "#00000077",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 50,
    resizeMode: "center"
  },
  backArrow: {
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "center"
  }
});
