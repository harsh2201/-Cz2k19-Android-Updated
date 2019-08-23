import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Easing
} from "react-native";
// import { Card } from "react-native-card-stack-swiper";
import Images from "react-native-remote-svg";
import MainCard from "./MainCard";
// import CircleTransition from "react-native-expanding-circle-transition";
import Modal from "react-native-modal";

// const ANIMATION_DURATION = 1200;
// const INITIAL_VIEW_BACKGROUND_COLOR = "#E3E4E5";
// const CIRCLE_COLOR1 = "#29C5DB";
// const CIRCLE_COLOR2 = "#4EB8AE";
// const CIRCLE_COLOR3 = "#81C781";
// const CIRCLE_COLOR4 = "#B0D882";
// const TRANSITION_BUFFER = 10;
// const POSITON = "custom";

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
        user_no: 200,
        code: "CZ19XWrd6"
      },
      calls: [
        {
          id: 1,
          name: "Harsh Jobanputra",
          status: "iOS & Android App Developer",
          image: "http://bit.ly/CZHarshAvatar"
        },
        {
          id: 2,
          name: "Satvik Padhiyar",
          status: "iOS App Developer",
          image: "http://bit.ly/CZSatvikAvatar"
        },
        {
          id: 3,
          name: "Shivam Shompura",
          status: "Android Developer",
          image: "http://bit.ly/CZShivamAvatar"
        },
        {
          id: 4,
          name: "Akrit Khanna",
          status: "Android Developer",
          image: "http://bit.ly/CZAkritAvatar"
        },
        {
          id: 5,
          name: "Vatsal Shah",
          status: "Android Developer",
          image:
            "https://preview.redd.it/r2n25pvy59z21.png?width=960&crop=smart&auto=webp&s=4e20f1394efa2987029c4976926773ce831cd508"
        },
        {
          id: 6,
          name: "Divyesh Rabadiya",
          status: "Android Developer",
          image:
            "https://cdn3.iconfinder.com/data/icons/diversity-avatars-vol-2/64/captain-jack-sparrow-pirate-carribean-512.png"
        },
        {
          id: 8,
          name: "Kanika Aggarwal",
          status: "Android Developer",
          image:
            "https://i.pinimg.com/originals/5b/71/ab/5b71ab4ea082c3c11e77312a64bba835.jpg"
        }
      ]
    };
  }

  componentDidMount() {
    t = this.state.tempProp;
    console.log(t.user_no % 100);
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
      <TouchableOpacity onPress={this.toggleModal}>
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
              <Image source={require("../assets/arrowBack.png")} />
            </TouchableOpacity>
            <View style={styles.heading}>
              <Text style={styles.headerText}>Developers</Text>
            </View>
            <View style={styles.waveContainer}>
              <Image
                source={require("../assets/wave.png")}
                style={styles.wave}
              />
            </View>
          </View>
          <MainCard
            data={this.state.calls}
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
export default About;

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
    // borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    // borderBottomWidth: 1,
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
    marginTop: 10,
    justifyContent: "flex-end"
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
    marginTop: 50
  }
});
