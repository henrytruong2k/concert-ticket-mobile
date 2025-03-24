import { HStack } from "@/components/HStack";
import { VStack } from "@/components/VStack";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export default function Header() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const menuWidth = 220;
  const slideAnim = useState(new Animated.Value(menuWidth))[0];

  const openMenu = () => {
    setIsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuWidth,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      p={10}
      w={screenWidth}
      backgroundColor="white"
    >
      <Image
        source={require("../assets/images/imgF_H/logoH.png")}
        style={{ width: 140, height: 50, resizeMode: "contain" }}
      />

      <TouchableOpacity style={styles.ticketButton}>
        <FontAwesome
          name="star"
          size={14}
          color="white"
          style={{ marginRight: 6 }}
        />
        <Text style={{ color: "white", fontWeight: "bold" }}>Mua Vé</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push(isLoggedIn ? "/(authed)/(tabs)/home" : "/login")
        }
      >
        <VStack alignItems="center">
          <FontAwesome name="user-o" size={18} color="black" />
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 12 }}>
            {isLoggedIn ? "Tài Khoản" : "Đăng Nhập"}
          </Text>
        </VStack>
      </TouchableOpacity>

      {/* Icon Menu */}
      <TouchableOpacity onPress={openMenu}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal menu */}
      <Modal animationType="none" transparent={true} visible={isVisible}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.menu,
              { transform: [{ translateX: slideAnim }], width: menuWidth },
            ]}
          >
            {/* Nút đóng */}
            <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
              <MaterialIcons name="close" size={28} color="black" />
            </TouchableOpacity>

            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
              <FontAwesome
                name="search"
                size={18}
                color="gray"
                style={styles.searchIcon}
              />
              <TextInput placeholder="Tìm kiếm" style={styles.searchInput} />
            </View>

            {/* Các mục menu */}
            {[
              "🎟️ Mua Vé",
              "🎬 Phim",
              "📸 Góc Điện Ảnh",
              "🎉 Sự Kiện",
              "🏛️ Rạp / Giá Vé",
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      </Modal>
    </HStack>
  );
}

const styles = StyleSheet.create({
  ticketButton: {
    flexDirection: "row",
    backgroundColor: "#f7941e",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row-reverse",
  },
  menu: {
    width: "75%",
    height: "100%",
    backgroundColor: "white",
    padding: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    alignSelf: "flex-start",
  },
  closeButton: { alignSelf: "flex-end" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1 },
  menuItem: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
});
