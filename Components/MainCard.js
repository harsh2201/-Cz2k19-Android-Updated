import React, { Component } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { Card } from "react-native-card-stack-swiper";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

class MainCard extends Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <View style={styles.listContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                extraData={this.props}
                data={this.props.data}
                keyExtractor={item => {
                  return item.id;
                }}
                style={{ marginBottom: HEIGHT / 14 }}
                renderItem={this.props.renderItem}
              />
            </View>
          </Card>
        </View>
      </View>
    );
  }
}
export default MainCard;

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
    color: "#222",
    fontSize: 18,
    width: 170
  },
  mblTxt: {
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
    width: WIDTH - 40,
    height: HEIGHT / 1.4,
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
    flex: 4
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
