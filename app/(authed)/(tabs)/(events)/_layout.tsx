import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, } from 'react-native'



export default function EventsLayout() {
  
  const flatlistRef = useRef<FlatList<any>>(null);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height
  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(()=>{
  //   setInterval(()=>{
  //     if(activeIndex === carouselData.length - 1){
  //       flatlistRef.current.scrollToIndex({
  //         index: 0,
  //         animation: true,
  //       });
  //     }else{
  //       flatlistRef.current.scrollToIndex({
  //         index:activeIndex + 1,
  //         animation: true,
  //       })
  //     }
  //   }, 2000);
  // });
  // const getItemLayout = (data, index) => ({
  //   length: screenWidth,
  //   offset: screenWidth * index,
  //   index: index,
  // });
    
  //Data carouselData
  const carouselData =[
    {
      id:"01",
      image: require("../../../../assets/images/imgCarousel/img1.jpeg"),
    },
    {
      id:"01",
      image: require("../../../../assets/images/imgCarousel/img2.jpg"),
    },
    {
      id:"01",
      image: require("../../../../assets/images/imgCarousel/img3.jpg"),
    },
    {
      id:"01",
      image: require("../../../../assets/images/imgCarousel/img4.jpg"),
    },
    {
      id:"01",
      image: require("../../../../assets/images/imgCarousel/img5.jpg"),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex === carouselData.length - 1 ? 0 : activeIndex + 1;
      
      flatlistRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 2200);

    return () => clearInterval(interval); // Dọn dẹp interval khi unmount
  }, [activeIndex]); // Chạy lại khi activeIndex thay đổi

  const getItemLayout = (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  //Display Images
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image source={item.image} style={{height: screenHeight * 0.26, width: screenWidth }}  resizeMode="contain"/>
      </View>
    );
  };

  //Handle Scroll
  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    // console.log("Scroll position:", scrollX);
    const index = scrollX / screenWidth;
    // console.log({index});
    setActiveIndex(index);
  };
  
  const renderDotIndicators = () => {
    return carouselData.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? "black" : "gray",
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      />
    ));
  };
  
  return (
    <View>
      <Text>Carousel</Text>
      <FlatList 
        data={carouselData}  
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}  
        keyExtractor={(item) => item.id} 
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <View style={{flexDirection:'row', justifyContent:'center', marginTop: 10}}>
        {renderDotIndicators()}
      </View>
    </View>
  );
}
    // <Stack screenOptions={{ headerBackTitle: "Events" }}>
    //   <View>
    //     <Text></Text>
    //   </View>
    //   <Stack.Screen name="index" />
    //   <Stack.Screen name="new" />
    //   <Stack.Screen name="event/[id]" />
    // </Stack>