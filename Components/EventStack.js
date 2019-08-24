import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import Images from "react-native-remote-svg";
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

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const TEMP = [
  {
    date: "13-14 SEPT.",
    department: "CIVIL",
    eventDescription:
      "This event is based on town planning. First round consists of a video clip and based that students have to take a quiz. Virtual bucks will be provided to buy different types of building structure. The teams have to design and build the model of a town. Some requirements of the town will be given by chits.",
    eventName: "Age of town",
    id: 20,
    likeCount: 4,
    maxParticipants: "Group (Min 3/Max 4 members per team)",
    organizerEmail: "info@cz19.in",
    posterUrl:
      "https://cdna.artstation.com/p/assets/images/images/012/391/236/large/aleksander-lukomskyy-final-ps.jpg?1534543321",
    price: "150",
    registrationFormLink: "",
    shortDescription: "Plan your town in a unique way.",
    type: "T",
    venue: "Charusat Institute of Science and Technology"
  },
  {
    date: "13-14 SEPT.",
    department: "NON-TECH",
    eventDescription:
      "Back to Box-office is a non-technical event. It is an event with fun and various activities. It checks the skills and talent of participants.",
    eventName: "Back to Box-office",
    id: 0,
    likeCount: 0,
    maxParticipants: "Group (Maximum 4 and Minimum 2).",
    organizerEmail: "info@cz19.in",
    posterUrl:
      "https://pmcvariety.files.wordpress.com/2019/01/international-2018-box-office-profits.jpg?w=1000&h=563&crop=1",
    price: "150",
    registrationFormLink: "",
    shortDescription: "",
    type: "NT",
    venue: "Charusat Institute of Science and Technology"
  },
  {
    date: "13-14 SEPT.",
    department: "CIVIL",
    eventDescription:
      "The participants will come with their candystick crane structure made according to given specifications and checking of the same will be done.",
    eventName: "Civil War",
    id: 22,
    likeCount: 1,
    maxParticipants: "Group (3 members per group)",
    organizerEmail: "info@cz19.in",
    posterUrl: "https://wallpaperaccess.com/full/98983.jpg",
    price: "200",
    registrationFormLink: "",
    shortDescription:
      "Dimensional Analysis and Load balancing of Candystick Crane.",
    type: "T",
    venue: "Charusat Institute of Science and Technology"
  },
  {
    date: "13-14 SEPT.",
    department: "CIVIL",
    eventDescription:
      "This event is based on town planning. First round consists of a video clip and based that students have to take a quiz. Virtual bucks will be provided to buy different types of building structure. The teams have to design and build the model of a town. Some requirements of the town will be given by chits.",
    eventName: "Age of town",
    id: 20,
    likeCount: 4,
    maxParticipants: "Group (Min 3/Max 4 members per team)",
    organizerEmail: "info@cz19.in",
    posterUrl:
      "https://cdna.artstation.com/p/assets/images/images/012/391/236/large/aleksander-lukomskyy-final-ps.jpg?1534543321",
    price: "150",
    registrationFormLink: "",
    shortDescription: "Plan your town in a unique way.",
    type: "T",
    venue: "Charusat Institute of Science and Technology"
  },
  {
    date: "13-14 SEPT.",
    department: "CIVIL",
    eventDescription:
      "This event is based on town planning. First round consists of a video clip and based that students have to take a quiz. Virtual bucks will be provided to buy different types of building structure. The teams have to design and build the model of a town. Some requirements of the town will be given by chits.",
    eventName: "Age of town",
    id: 20,
    likeCount: 4,
    maxParticipants: "Group (Min 3/Max 4 members per team)",
    organizerEmail: "info@cz19.in",
    posterUrl:
      "https://cdna.artstation.com/p/assets/images/images/012/391/236/large/aleksander-lukomskyy-final-ps.jpg?1534543321",
    price: "150",
    registrationFormLink: "",
    shortDescription: "Plan your town in a unique way.",
    type: "T",
    venue: "Charusat Institute of Science and Technology"
  },
  {
    date: "13-14 SEPT.",
    department: "CE",
    eventDescription:
      "It is a coding event on HackerEarth platform. There will be only 1 round of 3 hours. But there is one twist, after every 30 minutes, participant’s screen will be locked with a different password and participants will have to solve a puzzle in order to unlock the screen.",
    eventName: "Algorithm_Unlock",
    id: 4,
    likeCount: 2,
    maxParticipants: "Team of 2",
    organizerEmail: "info@cz19.in",
    posterUrl: "https://images8.alphacoders.com/676/thumb-1920-676481.jpg",
    price: "150",
    registrationFormLink: "",
    shortDescription: "Online coding with a twist.",
    type: "T",
    venue: "Charusat Institute of Science and Technology"
  }
];

export default class EventStack extends Component {
  constructor() {
    super();
    this.state = {
      data: TEMP,
      count: 0
    };
  }

  componentDidMount() {
    let item = {
      date: "13-14 SEPT.",
      department: "CIVIL",
      eventDescription:
        "The participants will come with their candystick crane structure made according to given specifications and checking of the same will be done.",
      eventName: "Civil War",
      id: 22,
      likeCount: 1,
      maxParticipants: "Group (3 members per group)",
      organizerEmail: "info@cz19.in",
      posterUrl: "https://wallpaperaccess.com/full/98983.jpg",
      price: "200",
      registrationFormLink: "",
      shortDescription:
        "Dimensional Analysis and Load balancing of Candystick Crane.",
      type: "T",
      venue: "Charusat Institute of Science and Technology"
    };

    let arr = [];
    let flag = 0;
    let data = this.state.data;
    let i = 0;
    for (k in data) {
      // console.log(data[k]);
      if (data[k].id === item.id) {
        flag = 1;
        console.log("ok");
      }
      if (flag === 1) {
        arr[i] = data[k];
        i++;
      }
    }
    console.log(data);
    this.setState({
      data: arr
    });
    this.forceUpdate();
  }

  like = item => {
    console.log(item);
    // firebase.database.ref("");
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Image source={require("../assets/14.jpg")} style={styles.background} /> */}
        <View style={styles.foreground}>
          <CardStack
            style={styles.content}
            disableBottomSwipe
            disableTopSwipe
            onSwiped={this.like}
            secondCardZoom={1.05}
            // onSwipedLeft={z => console.log(z)}
            // onSwipedRight={() => console.log("onSwipedRight")}
            ref={swiper => {
              this.swiper = swiper;
            }}
          >
            {this.state.data.map((item, i) => {
              return (
                <Card style={[styles.card, styles.card1]}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.posterUrl
                    }}
                  />
                  <Text style={styles.label}>{item.eventName}</Text>
                  <Text style={styles.desc}>{item.eventDescription}</Text>
                  <View style={styles.infoContainer}>
                    <Text style={styles.info}>{item.price}</Text>
                    <Text style={styles.info}>{item.department}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <TouchableOpacity style={styles.knowMoreContainer}>
                      <Text style={styles.knowMore}>Know More</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              );
            })}
          </CardStack>
          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.red]}
                onPress={() => {
                  this.swiper.swipeLeft();
                }}
              >
                <Text style={styles.buttonText}>MAYBE </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => {
                  this.swiper.swipeRight();
                }}
              >
                <Text style={styles.buttonText}>I LIKE THIS </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2"
  },
  foreground: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  content: {
    flex: 4,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  image: {
    flex: 4,
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  card: {
    width: 320,
    height: 575,
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  knowMoreContainer: {
    width: "45%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0066c0",
    borderRadius: 30
  },
  knowMore: {
    color: "#fff",
    fontSize: 15
  },
  info: {
    color: "#0d8f73",
    fontWeight: "500",
    fontSize: 24
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  desc: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 1,
    color: "#777777"
    // backgroundColor: "#777777"
  },
  label: {
    // flex: 1,
    // height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    fontWeight: "500",
    marginTop: 17,
    color: "#000",
    marginBottom: 10
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    borderRadius: 3.4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    width: "100%"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700"
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: "rgb(246,190,66)",
    borderWidth: 4,
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 100,
    height: "75%",
    backgroundColor: "#00b23b"
  },
  red: {
    width: 100,
    height: "75%",
    backgroundColor: "#ff4346"
  }
});
