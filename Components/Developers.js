import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { Card } from "react-native-card-stack-swiper";
import Images from "react-native-remote-svg";

class Developers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {
          id: 1,
          name: "Harsh Jobanputra",
          status: "iOS & Android App Developer",
          image: "../assets/gaitonde.jpg"
        },
        {
          id: 2,
          name: "Satvik Padhiyar",
          status: "iOS App Developer",
          image: "../assets/sartaj.jpg"
        },
        {
          id: 3,
          name: "Shivam Shompura",
          status: "Android Developer",
          image: "../assets/parulkar.jpg"
        },
        {
          id: 4,
          name: "Akrit Khanna",
          status: "active",
          image: "../assets/bunty.jpg"
        },
        {
          id: 5,
          name: "Erick Doe",
          status: "active",
          image: "../assets/baap2.jpg"
        },
        {
          id: 6,
          name: "Francis Doe",
          status: "active",
          image: "../assets/baap2.jpg"
        },
        {
          id: 8,
          name: "Matilde Doe",
          status: "active",
          image: "../assets/baap2.jpg"
        },
        {
          id: 9,
          name: "John Doe",
          status: "active",
          image: "../assets/baap2.jpg"
        },
        {
          id: 10,
          name: "Fermod Doe",
          status: "active",
          image: "../assets/baap2.jpg"
        },
        {
          id: 11,
          name: "Danny Doe",
          status: "active",
          image: "../assets/baap2.jpg"
        }
      ]
    };
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
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
              <Text style={styles.mblTxt}>Mobile</Text>
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
            <View style={styles.back}>
              <Images
                source={require("../assets/arrowBack.svg")}
                // style={}
              />
            </View>
            <View style={styles.heading}>
              <Text style={styles.headerText}>Developers</Text>
            </View>
            <View style={styles.waveContainer}>
              <Images
                source={require("../assets/wave.svg")}
                style={styles.wave}
              />
            </View>
          </View>
          <View style={styles.main}>
            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <View style={styles.listContainer}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                    data={this.state.calls}
                    keyExtractor={item => {
                      return item.id.toString();
                    }}
                    renderItem={this.renderItem}
                  />
                </View>
              </Card>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export default Developers;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    marginTop: 10
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
