import { Button } from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { eventService } from "@/services/events";
import { Event } from "@/types/event";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export default function EventDetailsScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  console.log(id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);

  function updateField(field: keyof Event, value: string | Date) {
    setEventData((prev: any) => ({
      ...prev!,
      [field]: value,
    }));
  }

  const onDelete = useCallback(async () => {
    if (!eventData) return;
    try {
      Alert.alert(
        "Delete Event",
        "Are you sure you want to delete this event?",
        [
          { text: "Cancel" },
          {
            text: "Delete",
            onPress: async () => {
              await eventService.deleteOne(id);
              router.back();
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to delete event");
    }
  }, [eventData, id]);

  async function onSubmitChanges() {
    if (!eventData) return;
    try {
      setIsSubmitting(true);
      await eventService.updateOne(
        Number(id),
        eventData.name,
        eventData.location,
        eventData.date,
      );
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fetchEvent = async () => {
    try {
      const response = await eventService.getOne(id);
      console.log(response);
      setEventData(response.data);
    } catch (error) {
      router.back();
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvent();
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => headerRight(onDelete),
    });
  }, [navigation, onDelete]);

  return (
    <VStack m={20} flex={1} gap={30}>
      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          Tên sự kiện
        </Text>
        <Input
          value={eventData?.name}
          onChangeText={(value) => updateField("name", value)}
          placeholder="Tên sự kiện"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          Địa điểm
        </Text>
        <Input
          value={eventData?.location}
          onChangeText={(value) => updateField("location", value)}
          placeholder="Địa điểm"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          Ngày tổ chức
        </Text>
        <DateTimePicker
          onChange={(date: any) => updateField("date", date || new Date())}
          currentDate={new Date(eventData?.date || new Date())}
        />
      </VStack>

      <Button
        mt={"auto"}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={onSubmitChanges}
      >
        Save Changes
      </Button>
    </VStack>
  );
}

const headerRight = (onPress: VoidFunction) => {
  return <TabBarIcon size={30} name="trash" onPress={onPress} />;
};
