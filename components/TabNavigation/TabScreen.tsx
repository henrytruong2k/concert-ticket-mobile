import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TabBar from "./TabNavigation";
import Carousel from "../Carousel/Carousel";
import GetCarouselEvent from "../Carousel/GetCarouselEvent";

export default function TabScreen() {
  const [activeTab, setActiveTab] = useState(0); // Mặc định chọn tab đầu tiên

  return (
    <View style={styles.container}>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <View style={styles.content}>
        {activeTab === 0 ? (
          <Text style={styles.text}>{/* <GetCarouselEvent /> */}</Text>
        ) : (
          <Text style={styles.text}></Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
