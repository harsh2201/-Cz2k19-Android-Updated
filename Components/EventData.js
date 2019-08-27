import * as React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import Text from "./customText";

// You can import from local files
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

var props;
export default class EventData extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    props = navigation.getParam("data");
    this.setState({
      data: props
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backImage}
          source={{
            uri: this.state.data.posterUrl
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("EventStack");
            }}
          >
            <View
              style={{
                marginTop: screenHeight / 25,
                marginLeft: screenHeight / 40,
                backgroundColor: "rgba(0,0,0,0.5)",
                height: 40,
                width: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10
              }}
            >
              <Ionicons name="ios-arrow-back" size={30} color="#fff" />
            </View>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.dataContainer}>
          <View style={styles.heartContainer}>
            <Ionicons name="md-heart" size={30} color="red" />
          </View>
          <ScrollView>
            <View style={styles.topHeading}>
              <Text
                style={{
                  flex: 1,
                  color: "#000",
                  fontSize: 25,
                  //fontWeight: "700",
                  opacity: 1,
                  padding: 10
                }}
              >
                {this.state.data.eventName}
              </Text>
              <Text
                style={{
                  //fontWeight: "700",
                  marginRight: screenWidth / 8,
                  color: "#000"
                }}
              >
                {this.state.data.likeCount}
              </Text>
            </View>
            <View style={styles.mainDataContainer}>
              <Text style={styles.heading}>About Event </Text>
              <Text style={styles.data}>
                {this.state.data.eventDescription}
              </Text>
              <Text style={styles.heading}>Event details </Text>

              <View>
                <View style={styles.eventDetailsContainer}>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventDetailsHeading}>Date</Text>
                    <Text style={styles.eventDetailsData}>
                      {this.state.data.date}
                    </Text>
                  </View>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventDetailsHeading}>Price</Text>
                    <Text style={styles.eventDetailsData}>
                      {this.state.data.price}
                    </Text>
                  </View>
                </View>
                <View style={styles.eventDetailsContainer}>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventDetailsHeading}>Venue</Text>
                    <Text style={styles.eventDetailsData}>
                      {this.state.data.venue}
                    </Text>
                  </View>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventDetailsHeading}>
                      Max participants
                    </Text>
                    <Text style={styles.eventDetailsData}>
                      {this.state.data.maxParticipants}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  backImage: {
    height: screenHeight / 2.5,
    width: screenWidth
  },
  dataContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -screenHeight / 11.2,
    borderTopRightRadius: 50,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  heartContainer: {
    height: screenHeight / 12,
    width: screenHeight / 12,
    borderRadius: screenHeight / 6,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: screenWidth / 12,
    marginTop: -screenHeight / 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11
  },
  mainDataContainer: {
    flex: 1,
    margin: 10
  },
  heading: {
    fontSize: 20,
    //fontWeight: "bold",
    padding: 10,
    color: "#000"
  },
  data: {
    fontSize: 15,
    margin: 5,
    marginLeft: 20,
    lineHeight: 20,
    color: "#000"
  },
  topHeading: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 10,
    color: "#000"
  },
  eventDetails: {
    flex: 1,
    padding: 10
  },
  eventDetailsContainer: {
    flex: 1,
    flexDirection: "row"
  },
  eventDetailsHeading: {
    fontSize: 15,
    //fontWeight: "bold",
    color: "#000"
  },
  eventDetailsData: {
    fontSize: 12,
    color: "#000"
  }
});
