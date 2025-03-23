import { Button } from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { eventService } from "@/services/events";
import { Event } from "@/types/event";
import { formatVND } from "@/utils/concurrency";
import { getFileExtension, getFileName } from "@/utils/image";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Image, ScrollView } from "react-native";

export default function EventDetailsScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [image, setImage] = useState("");

  function updateField(field: keyof Event, value: string | Date) {
    setEventData((prev) => ({
      ...prev!,
      [field]: value,
    }));
  }

  const handleAmountChange = (value: string) => {
    const parsedValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
    updateField("amount", formatVND(parsedValue.toString()));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
      const amountValue = parseInt(
        eventData?.amount.toString().replace(/\D/g, ""),
        10,
      );

      const formData = new FormData();
      formData.append("name", eventData?.name);
      formData.append("location", eventData?.location);
      formData.append("date", new Date(eventData.date).toISOString());
      formData.append("amount", amountValue.toString());
      console.log(image);
      if (image) {
        const fileName = getFileName(
          image,
          eventData.name,
          new Date(eventData.date),
        );
        formData.append("files", {
          uri: image,
          type: `image/${getFileExtension(image)}`,
          name: fileName,
        } as any);
      }

      console.log(formData);

      await eventService.updateOne(eventData._id, formData);
      router.back();
    } catch (error: any) {
      console.log({ error });
      Alert.alert("Error", "Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fetchEvent = async () => {
    try {
      const response = await eventService.getOne(id);
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
    <ScrollView>
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
        <VStack gap={5}>
          <Text ml={10} fontSize={14} color="gray">
            Giá vé (VNĐ)
          </Text>
          <Input
            value={formatVND(eventData?.amount?.toString() || 0)}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
            placeholder="Nhập giá vé"
            placeholderTextColor="darkgray"
            h={48}
            p={14}
          />
        </VStack>

        {eventData?.image && image === "" && (
          <Image
            source={{ uri: eventData?.image }}
            style={{ width: 400, height: 300 }}
          />
        )}

        <VStack gap={5}>
          <VStack flex={1} alignItems="center" justifyContent="center">
            <Button m={5} variant="outlined" onPress={pickImage}>
              Chọn ảnh sự kiện
            </Button>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 400, height: 300 }}
              />
            )}
          </VStack>
        </VStack>
        <Button
          mt={"auto"}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          onPress={onSubmitChanges}
        >
          Lưu thay đổi
        </Button>
      </VStack>
    </ScrollView>
  );
}

const headerRight = (onPress: VoidFunction) => {
  return <TabBarIcon size={30} name="trash" onPress={onPress} />;
};
