import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import { FontAwesome } from "@expo/vector-icons";
import { View, Dimensions, DimensionValue, Image } from "react-native";

export default function Footer() {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = screenWidth > 600 ? 4 : screenWidth > 350 ? 2 : 1;
  const columnWidth: DimensionValue = `${100 / numColumns}%` as DimensionValue;

  return (
    <View
      style={{
        backgroundColor: "black",
        padding: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: screenWidth,
      }}
    >
      <VStack style={{ width: columnWidth, marginBottom: 20 }}>
        <Text fontSize={14} color="white" bold>
          GIỚI THIỆU
        </Text>
        <Text fontSize={14} color="gray">
          Về Chúng Tôi
        </Text>
        <Text fontSize={14} color="gray">
          Thỏa Thuận Sử Dụng
        </Text>
        <Text fontSize={14} color="gray">
          Quy Chế Hoạt Động
        </Text>
        <Text fontSize={14} color="gray">
          Chính Sách Bảo Mật
        </Text>
      </VStack>

      <VStack style={{ width: columnWidth, marginBottom: 20 }}>
        <Text fontSize={14} color="white" bold>
          GÓC ĐIỆN ẢNH
        </Text>
        <Text fontSize={14} color="gray">
          Thể Loại Phim
        </Text>
        <Text fontSize={14} color="gray">
          Bình Luận Phim
        </Text>
        <Text fontSize={14} color="gray">
          Blog Điện Ảnh
        </Text>
        <Text fontSize={14} color="gray">
          Phim Hay Tháng
        </Text>
        <Text fontSize={14} color="gray">
          Phim IMAX
        </Text>
      </VStack>

      <VStack style={{ width: columnWidth, marginBottom: 20 }}>
        <Text fontSize={14} color="white" bold>
          HỖ TRỢ
        </Text>
        <Text fontSize={14} color="gray">
          Góp Ý
        </Text>
        <Text fontSize={14} color="gray">
          Sale & Services
        </Text>
        <Text fontSize={14} color="gray">
          Rap / Giá Vé
        </Text>
        <Text fontSize={14} color="gray">
          Tuyển Dụng
        </Text>
      </VStack>

      <VStack alignItems="center" style={{ width: screenWidth / 2.3 }}>
        <Image
          source={require("../assets/images/imgF_H/logo.png")}
          style={{ width: "90%", height: 60, marginBottom: 10 }}
          resizeMode="contain"
        />
        <HStack>
          <FontAwesome
            name="facebook"
            size={20}
            color="#fff"
            style={{ marginHorizontal: 10 }}
          />
          <FontAwesome
            name="youtube"
            size={20}
            color="#fff"
            style={{ marginHorizontal: 10 }}
          />
          <FontAwesome
            name="instagram"
            size={20}
            color="#fff"
            style={{ marginHorizontal: 10 }}
          />
        </HStack>
        <Image
          source={require("../assets/images/imgF_H/glx_trade.61f6c35c.png")}
          style={{ width: "60%", height: 50, marginTop: 10 }}
          resizeMode="contain"
        />
      </VStack>
      <HStack>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "gray",
            marginTop: 20,
            paddingTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Công Ty Cổ Phần Một Thành Viên HTP Cinema
          </Text>

          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 14,
              marginVertical: 5,
            }}
          >
            Đại Học Sư Phạm Kỹ Thuật Thành Phố Hồ Chí Minh
          </Text>

          <HStack>
            <Text style={{ color: "gray", fontSize: 12 }}>
              📞 022.22.222.222 - 📞 1900123456 (9:00 - 22:00)
            </Text>
          </HStack>

          <Text style={{ color: "#B0B0B0", fontStyle: "italic", fontSize: 13 }}>
            ✉️ htpsupport.vn
          </Text>
        </View>
      </HStack>
    </View>
  );
}
