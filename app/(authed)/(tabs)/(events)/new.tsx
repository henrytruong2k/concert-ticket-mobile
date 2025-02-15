import { Button } from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { eventService } from "@/services/events";
import { formatVND } from "@/utils/concurrency";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
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

  async function onSubmit() {
    try {
      setIsSubmitting(true);
      const amountValue = parseInt(amount.replace(/\D/g, ""), 10);
      await eventService.createOne(
        name,
        location,
        date.toISOString(),
        amountValue,
      );
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create event");
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

          <Button
            mt={"auto"}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            onPress={onSubmit}
          >
            Save
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
