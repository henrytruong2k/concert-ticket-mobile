import { Text, View, ScrollView, Image, StyleSheet } from "react-native";
import { VStack } from "@/components/VStack";
import { eventService } from "@/services/events";
import { Event } from "@/types/event";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function EventAttendeeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [eventData, setEventData] = useState<Event | null>(null);

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

  const formatDateWithTime = (dateString: any) => {
    if (!dateString) return "Chưa có ngày";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <ScrollView style={styles.container}>
      <VStack m={10} gap={10} justifyContent="center" alignItems="center">
        {/* Tên sự kiện */}
        <View style={styles.card}>
          <Text style={styles.title}>Tên sự kiện</Text>
          <Text style={styles.content}>{eventData?.name}</Text>
        </View>

        {/* Địa điểm */}
        <View style={styles.card}>
          <Text style={styles.title}>Địa điểm</Text>
          <Text style={styles.content}>{eventData?.location}</Text>
        </View>

        {/* Ngày tổ chức */}
        <View style={styles.card}>
          <Text style={styles.title}>Ngày tổ chức</Text>
          <Text style={styles.content}>
            {formatDateWithTime(eventData?.date)}
          </Text>
        </View>

        {/* Giá vé */}
        <View style={styles.card}>
          <Text style={styles.title}>Giá vé (VNĐ)</Text>
          <Text style={styles.content}>
            {eventData?.amount?.toLocaleString("vi-VN")} VNĐ
          </Text>
        </View>

        {/* Hình ảnh */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: eventData?.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12, // Giảm padding
    width: "90%",
    alignItems: "center",
    marginBottom: 5, // Giảm marginBottom
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3f51b5",
    textAlign: "center",
    marginBottom: 5,
  }, // Giảm fontSize
  content: { fontSize: 16, color: "#424242", textAlign: "center" }, // Giảm fontSize
  imageCard: {
    width: "90%",
    height: 150, // Giảm height
    overflow: "hidden",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
});
