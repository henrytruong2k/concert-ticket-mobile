import { Button } from "@/components/Button";
import { VStack } from "@/components/VStack";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React from "react";
import { ActivityIndicator, Text } from "react-native";

export default function ScanTicketScreen() {
  const [permission, requestPermission] = useCameraPermissions();

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

  function onBarcodeScanned({ data }: BarcodeScanningResult) {
    console.log(data);
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
