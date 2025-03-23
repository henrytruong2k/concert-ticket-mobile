import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { eventService } from "@/services/events";
import { Event } from "@/types/event";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Image } from "react-native";

export default function EventAttendeeDetailScreen() {
  const { id } = useLocalSearchParams();

  const [eventData, setEventData] = useState<Event | null>(null);

  const fetchEvent = async () => {
    console.log("fetch event chạy");
    try {
      const response = await eventService.getOne(id);

      console.log(response);
      setEventData(response.data);
      // setImage(response.data.image);
    } catch (error) {
      router.back();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvent();
    }, []),
  );

  return (
    <VStack m={20} flex={1} gap={30}>
      <Text>Quản lý sự kiện (Attendee)</Text>
      <Text>ID: {id}</Text>
      <Text>Tên sự kiện: {eventData?.name}</Text>
      <Image
        source={{ uri: eventData?.image }}
        style={{ width: "100%", aspectRatio: 1 }}
        resizeMode="contain"
      />
    </VStack>
  );
}
