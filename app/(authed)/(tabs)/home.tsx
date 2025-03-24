import Carousel from "@/components/Carousel/Carousel";
import Footer from "@/components/Footer";
import TabNavigation from "@/components/TabNavigation/TabNavigation";
import TabScreen from "@/components/TabNavigation/TabScreen";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import React from "react";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <VStack flex={1}>
        <VStack flex={2}>
          <Carousel />
          <TabScreen />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
