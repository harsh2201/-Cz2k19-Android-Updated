import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking
} from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import MainCard from "./MainCard";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import Text from "./customText";
import track from "../Data/Amplitude";

const data = [
  {
    id: 1,
    name: "Pranay Shah",
    contact: "8866871097"
  },
  {
    id: 2,
    name: "Manush Parikh",
    contact: "8866997039"
  },
  {
    id: 3,
    name: "Rutwik Patel",
    contact: "9913841384"
  }
];

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello",
      code: "",
      inst: "",
      isModalVisible: false,
      customLeftMargin: 0,
      customTopMargin: 0,
      counter: 0,
      tempProp: {
        user_no: 200,
        code: "CZ19XWrd6"
      }
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("didFocus", payload => {
      track(this.props.heading);
    });
    t = this.state.tempProp;
    if (t.user_no % 100 === 0 && t.user_no <= 1000) {
      this.setState({
        message: "Congratulations!\nYou just won a luckty prize",
        code: t.code,
        inst: "Ensure to collect the prize from the coordinators"
      });
    } else {
      this.setState({
        code: "Sorry!\nYou didn't get the prize",
        message: "",
        inst: ""
      });
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: true });
    setTimeout(() => {
      this.setState({ isModalVisible: false });
    }, 3000);
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel:+91${item.contact}`);
          track(this.props.heading, { [item.name]: "called" });
        }}
      >
        <View style={styles.row}>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} ellipsizeMode="tail">
                {item.name}
              </Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>Executive Central Council</Text>

              <Text style={styles.msgTxt}>{item.contact}</Text>
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
            data={data}
            renderItem={this.renderItem}
            exraData={this.state}
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
            <View style={styles.modalContent}>
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
export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    marginTop: 10
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    alignSelf: "center"
  },
  modalContentTitle: {
    flex: 2,
    fontSize: 30,
    justifyContent: "flex-start",
    alignSelf: "center",
    marginTop: 20,
    textAlign: "center",
    textAlignVertical: "center"
  },
  modalContentCode: {
    flex: 6,
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
    flex: 4,
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
    height: 60
  },
  nameContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 280
  },
  nameTxt: {
    marginLeft: 15,
    color: "#222",
    fontSize: 18,
    width: 170
  },
  mblTxt: {
    marginTop: 6,
    marginLeft: 15,
    color: "#777",
    fontSize: 13
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
    marginLeft: 20,
    width: "50%"
  },
  backImage: {
    flex: 1
  },
  card: {
    width: 320,
    height: 575,
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
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  wave: {
    alignSelf: "flex-start",
    resizeMode: "contain",
    marginTop: 10,
    height: 10,
    width: screenWidth / 5
  },
  waveContainer: {
    marginLeft: 20,
    justifyContent: "flex-end"
  },
  main: {
    flex: 6,
    maxHeight: 500
  },
  back: {
    height: 40,
    width: 40,
    backgroundColor: "#00000077",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 50
  },
  backArrow: {
    height: 20,
    width: 20,
    backgroundColor: "#00000077",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "center"
  }
});
