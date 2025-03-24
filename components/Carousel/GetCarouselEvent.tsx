import { VStack } from "@/components/VStack";
import { useRef, useState } from "react";
import { FlatList, Image, View, Text, Dimensions } from "react-native";

export default function CarouselEvent() {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const eventData = [
    {
      id: "01",
      name: "Concert A",
      date: "2025-06-20",
      price: 50000,
      image: require("../../assets/images/imgCarousel/img1.png"),
    },
    {
      id: "02",
      name: "Festival B",
      date: "2025-07-15",
      price: 40000,
      image: require("../../assets/images/imgCarousel/img2.png"),
    },
    {
      id: "03",
      name: "Show C",
      date: "2025-08-10",
      price: 60000,
      image: require("../../assets/images/imgCarousel/img3.png"),
    },
    {
      id: "04",
      name: "Gala D",
      date: "2025-09-05",
      price: 70000,
      image: require("../../assets/images/imgCarousel/img4.png"),
    },
    {
      id: "05",
      name: "Concert E",
      date: "2025-10-22",
      price: 55000,
      image: require("../../assets/images/imgCarousel/img5.png"),
    },
    {
      id: "06",
      name: "Concert A",
      date: "2025-10-22",
      price: 55000,
      image: require("../../assets/images/imgCarousel/img2.png"),
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderItem = ({ item }) => (
    <View style={{ width: screenWidth / 2 - 20, margin: 10 }}>
      <Image
        source={item.image}
        style={{ width: "100%", height: screenHeight * 0.28, borderRadius: 10 }}
        resizeMode="stretch"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ fontSize: 12, fontWeight: "bold", color: "gray" }}>
          {formatPrice(item.price)}
        </Text>
      </View>
      {/* <Text style={{ fontSize: 14, color: "gray", textAlign: "center" }}>
        {item.date}
      </Text> */}
    </View>
  );

  return (
    <VStack flex={1} alignItems="center" w={screenWidth}>
      <FlatList
        data={eventData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "center" }}
      />
    </VStack>
  );
}
