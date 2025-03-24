import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, ScrollView } from "react-native";

import { format } from "date-fns";

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const [image, setImage] = useState(
    "../../../assets/images/vecteezy_user-icon-on-transparent-background_19879186.png",
  );
  const [togglePassword, setTogglePassword] = useState<boolean>(true); // true => hide
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const formattedDate = format(dateOfBirth, "dd/MM/yyyy");

  /*Xử lý thay đổi hình ảnh*/
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

  /* Xử lý chọn ngày tháng*/
  const handleDateChange = (newDate: Date) => {
    setDateOfBirth(newDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack flex={1} p={20} bgr={"#fff"}>
        <VStack
          // flex={1}
          direction="row"
          // justifyContent="space-between"
          alignItems="center"
          mb={20}
          bgr="skyblue"
          p={20}
          style={{
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
        >
          <VStack
            h={100}
            w={100}
            bgr="darkgray"
            bdr={75}
            mb={30}
            justifyContent="center"
            alignItems="center"
            style={{
              backgroundImage:
                "../../../assets/images/vecteezy_user-icon-on-transparent-background_19879186.png",
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", aspectRatio: 1 }}
                resizeMode="contain"
              />
            )}
            {/* Button Image, Text Email */}
          </VStack>
          <VStack flex={3} direction="column" p={5} h={300} mb={10}>
            <Button m={5} variant="outlined" onPress={pickImage} mb={5}>
              <Text cl="gray">Chọn ảnh đại diện</Text>
            </Button>
            <Text color="gray" mt={5}>
              Email: {user?.email}
            </Text>
          </VStack>

          {/* <Text>Role: {user?.role}</Text> */}
        </VStack>

        {/* <Button onPress={logout}>Logout</Button> */}
        <VStack gap={0} mb={10}>
          <Text ml={20} fontSize={14} color="gray">
            Name
          </Text>
          <Input
            // onChangeText={}
            placeholder="Nhập Tên"
            placeholderTextColor="darkgray"
            h={48}
            p={14}
            mt={5}
          />
        </VStack>
        <VStack gap={0} mb={10}>
          <Text ml={20} fontSize={14} cl="gray">
            Email
          </Text>
          <Input
            value={user?.email}
            placeholder=""
            placeholderTextColor="darkgray"
            h={48}
            p={14}
            mt={5}
          />
        </VStack>
        <VStack gap={0} mb={10}>
          <Text ml={20} fontSize={14} cl="gray">
            Password
          </Text>
          <Input
            placeholder="Nhập password"
            secureTextEntry={togglePassword}
            placeholderTextColor="darkgray"
            h={48}
            p={14}
            mt={5}
          />
        </VStack>

        <VStack gap={0} mt={5} mb={10}>
          <Text ml={20} fontSize={14} cl="gray">
            Địa chỉ
          </Text>

          <Input
            placeholder="Nhập địa chỉ"
            placeholderTextColor="darkgray"
            h={48}
            p={14}
            mt={5}
          />
        </VStack>

        <VStack direction="column" p={20}>
          <Button mb={10} variant="outlined">
            <Text>Xác nhận</Text>
          </Button>
          <Button onPress={logout}>
            <Text>Đăng xuất</Text>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
