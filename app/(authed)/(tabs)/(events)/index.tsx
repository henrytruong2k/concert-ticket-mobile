import { Button } from "@/components/Button";
import { formatISODate } from "@/components/DateTimePicker";
import { Divider } from "@/components/Divider";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useAuth } from "@/context/AuthContext";
import { eventService } from "@/services/events";
import { ticketService } from "@/services/tickets";
import { Event } from "@/types/event";
import { UserRole } from "@/types/user";
import { formatVND } from "@/utils/concurrency";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation, router, Href } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, FlatList, TouchableOpacity, Image, View, Dimensions } from "react-native";

export default function EventsScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  // Thêm dữ liệu Carousel
  const flatlistRef = useRef<FlatList<any>>(null);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    { id: "01", image: require("../../../../assets/images/imgCarousel/img1.jpeg") },
    { id: "02", image: require("../../../../assets/images/imgCarousel/img2.jpg") },
    { id: "03", image: require("../../../../assets/images/imgCarousel/img3.jpg") },
    { id: "04", image: require("../../../../assets/images/imgCarousel/img4.jpg") },
    { id: "05", image: require("../../../../assets/images/imgCarousel/img5.jpg") },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselData.length === 0) return; // Kiểm tra nếu không có dữ liệu
  
      const nextIndex = activeIndex >= carouselData.length - 1 ? 0 : activeIndex + 1;
  
      flatlistRef.current?.scrollToIndex({ 
        index: nextIndex, 
        animated: true 
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
    <View style={{ alignItems: "center" }}>
      <Image source={item.image} style={{ height: screenHeight * 0.32, width: screenWidth }} resizeMode="contain" />
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
          borderWidth: 0.4, 
          borderColor: "white", 
        }}
      />
    ));
  };

  function onGoToEventPage(id: string) {
    if (user?.role === UserRole.Manager) {
      router.push(`/(events)/event/${id}` as Href);
    }
  }

  async function buyTicket(event: Event) {
    try {
      await ticketService.createOne(event);
      Alert.alert("Success", "Ticket purchased successfully");
      fetchEvents();
    } catch (error) {
      Alert.alert("Error", "Failed to buy ticket");
    }
  }

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Events",
      headerRight: user?.role === UserRole.Manager ? headerRight : null,
    });
  }, [navigation, user]);

  return (
    <VStack flex={1}  pb={0} gap={20}>
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
          const index = event.nativeEvent.contentOffset.x / screenWidth;
          setActiveIndex(index);
          }}
        />
        <View style={{
          position: "absolute",
          bottom: 5,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center"
        }}>
            {renderDotIndicators()}
        </View>

      </VStack>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize={18} bold>
          {events.length} Events
        </Text>
      </HStack>

      <FlatList
        keyExtractor={(item) => item._id.toString()}
        data={events}
        onRefresh={fetchEvents}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <VStack h={20} />}
        renderItem={({ item: event }) => (
          <VStack
            gap={20}
            p={20}
            style={{
              backgroundColor: "white",
              borderRadius: 20,
            }}
            key={event._id}
          >
            <TouchableOpacity onPress={() => onGoToEventPage(event._id)}>
              <HStack alignItems="center" justifyContent="space-between">
                <VStack>
                  <Text fontSize={26} bold>
                    {event.name}
                  </Text>
                  <Text fontSize={16} bold>
                    {event.location}
                  </Text>
                  <Text fontSize={16} bold>
                    Giá vé: {formatVND(event.amount)}
                  </Text>
                </VStack>
                {user?.role === UserRole.Manager && (
                  <TabBarIcon size={24} name="chevron-forward" />
                )}
              </HStack>
            </TouchableOpacity>

            <Divider />

            <HStack justifyContent="space-between">
              <Text bold fontSize={16} color="gray">
                Sold: {event.totalTicketsPurchased}
              </Text>
              <Text bold fontSize={16} color="green">
                Entered: {event.totalTicketsEntered}
              </Text>
            </HStack>

            {user?.role === UserRole.Attendee && (
              <VStack>
                <Button
                  variant="outlined"
                  disabled={isLoading}
                  onPress={() => buyTicket(event)}
                >
                  Buy Ticket
                </Button>
              </VStack>
            )}

            <Text fontSize={13} color="gray">
              {formatISODate(event.date)}
            </Text>
          </VStack>
        )}
      />
    </VStack>
  );
}

const headerRight = () => {
  return (
    <TabBarIcon
      size={32}
      name="add-circle-outline"
      onPress={() => router.push("/(events)/new" as Href)}
    />
  );
};
