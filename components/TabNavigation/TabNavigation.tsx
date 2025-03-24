import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";

export default function TabBar({ onTabChange }) {
  const tabs = ["Sự kiện bạn có thể quan tâm", "Sự kiện sắp diễn ra"];
  const [activeTab, setActiveTab] = useState(0);
  const underlineAnim = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / tabs.length;

  const handleTabPress = (index) => {
    setActiveTab(index);
    onTabChange(index);
    Animated.timing(underlineAnim, {
      toValue: index * tabWidth,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, { width: tabWidth }]}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View
        style={[
          styles.underline,
          {
            width: tabWidth * 0.9,
            transform: [{ translateX: underlineAnim }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // marginTop: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  tab: {
    alignItems: "center",
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
  activeTabText: {
    color: "blue",
    fontWeight: "bold",
  },
  underline: {
    height: 3,
    backgroundColor: "blue",
    position: "absolute",
    bottom: 0,
    left: 10,
  },
});
