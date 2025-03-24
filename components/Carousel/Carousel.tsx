import { VStack } from "@/components/VStack";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, View, Dimensions } from "react-native";

export default function HomeScreen() {
  const flatlistRef = useRef<FlatList<any>>(null);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    { id: "01", image: require("../../assets/images/imgCarousel/img1.png") },
    { id: "02", image: require("../../assets/images/imgCarousel/img2.png") },
    { id: "03", image: require("../../assets/images/imgCarousel/img3.png") },
    { id: "04", image: require("../../assets/images/imgCarousel/img4.png") },
    { id: "05", image: require("../../assets/images/imgCarousel/img5.png") },
  ];

  useEffect(() => {
    if (carouselData.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex =
        activeIndex >= carouselData.length - 1 ? 0 : activeIndex + 1;

      flatlistRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 2200);

    return () => clearInterval(interval);
  }, [activeIndex, carouselData.length]);

  const getItemLayout = (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const renderItem = ({ item }) => (
    <View style={{ width: screenWidth, alignItems: "center" }}>
      <Image
        source={item.image}
        style={{ width: "100%", height: screenHeight * 0.28 }}
        resizeMode="stretch"
      />
    </View>
  );

  const renderDotIndicators = () => {
    return carouselData.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? "black" : "white",
          height: 8,
          width: 8,
          borderRadius: 5,
          marginHorizontal: 6,
          borderWidth: 0.8,
          borderColor: "white",
        }}
      />
    ));
  };

  return (
    <VStack flex={1} alignItems="center" w={screenWidth}>
      <View style={{ width: screenWidth }}>
        <VStack mb={5} style={{ position: "relative" }}>
          <FlatList
            data={carouselData}
            ref={flatlistRef}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / screenWidth,
              );
              setActiveIndex(index);
            }}
            scrollEventThrottle={16}
          />
          <View
            style={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {renderDotIndicators()}
          </View>
        </VStack>
      </View>
    </VStack>
  );
}
