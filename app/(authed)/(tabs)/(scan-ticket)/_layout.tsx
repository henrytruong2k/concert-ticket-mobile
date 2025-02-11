import { Button } from "@/components/Button";
import { VStack } from "@/components/VStack";
import { ticketService } from "@/services/tickets";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, Vibration } from "react-native";

export default function ScanTicketScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(true);

  if (!permission) {
    return (
      //loading state
      <VStack flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </VStack>
    );
  }

  if (!permission.granted) {
    return (
      <VStack gap={20} flex={1} justifyContent="center" alignItems="center">
        <Text>Camera access is required to scan tickets.</Text>
        <Button onPress={requestPermission}>Allow Camera Access</Button>
      </VStack>
    );
  }

  async function onBarcodeScanned({ data }: BarcodeScanningResult) {
    if (!scanningEnabled) return;

    try {
      Vibration.vibrate();
      setScanningEnabled(false);

      const { ticketId, ownerId } = JSON.parse(data);

      await ticketService.scan(ticketId, ownerId);

      Alert.alert("Success", "Ticket validated successfully.", [
        { text: "Ok", onPress: () => setScanningEnabled(true) },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to validate ticket. Please try again.", [
        { text: "Ok", onPress: () => setScanningEnabled(true) },
      ]);
      setScanningEnabled(true);
    }
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      facing="back"
      onBarcodeScanned={onBarcodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
    />
  );
}
