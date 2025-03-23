import { Button } from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { eventService } from "@/services/events";
import { formatVND } from "@/utils/concurrency";
import { getFileExtension, getFileName } from "@/utils/image";
import * as ImagePicker from "expo-image-picker";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function NewEvent() {
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");

  async function onSubmit() {
    try {
      setIsSubmitting(true);
      const amountValue = parseInt(amount.replace(/\D/g, ""), 10);
      const fileName = getFileName(image, name, date);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("date", date.toISOString());
      formData.append("amount", amountValue.toString());
      formData.append("file", {
        uri: image,
        type: `image/${getFileExtension(image)}`,
        name: fileName,
      } as any);
      await eventService.createOne(formData);
      router.back();
    } catch (error) {
      ~Alert.alert("Error", "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  }

  function onChangeDate(date?: Date) {
    setDate(date || new Date());
  }

  function handleAmountChange(value: string) {
    setAmount(formatVND(value));
  }

  useEffect(() => {
    navigation.setOptions({ headerTitle: "New Event" });
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Quyền bị từ chối", "Bạn cần cấp quyền truy cập ảnh.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9], // Tỉ lệ ảnh
      quality: 1, // Chất lượng ảnh (1 = cao nhất)
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(image);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
      >
        <VStack gap={20}>
          <VStack gap={5}>
            <Text ml={10} fontSize={14} color="gray">
              Tên sự kiện
            </Text>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Nhập tên sự kiện"
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
              value={location}
              onChangeText={setLocation}
              placeholder="Nhập địa điểm"
              placeholderTextColor="darkgray"
              h={48}
              p={14}
            />
          </VStack>

          <VStack gap={5}>
            <Text ml={10} fontSize={14} color="gray">
              Ngày tổ chức
            </Text>
            <DateTimePicker onChange={onChangeDate} currentDate={date} />
          </VStack>

          <VStack gap={5}>
            <Text ml={10} fontSize={14} color="gray">
              Giá vé (VNĐ)
            </Text>
            <Input
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
              placeholder="Nhập giá vé"
              placeholderTextColor="darkgray"
              h={48}
              p={14}
            />
          </VStack>

          <VStack gap={5}>
            <VStack flex={1} alignItems="center" justifyContent="center">
              <Button m={5} variant="outlined" onPress={pickImage}>
                Chọn ảnh sự kiện
              </Button>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", aspectRatio: 1 }}
                  resizeMode="contain"
                />
              )}
            </VStack>
          </VStack>

          <Button
            mt={"auto"}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            onPress={onSubmit}
          >
            Tạo mới
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
