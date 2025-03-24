import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import React from "react";
import { Platform } from "react-native";
import { Button } from "./Button";
import { HStack } from "./HStack";
import { Text } from "./Text";

interface DateTimePickerProps {
  onChange: (date: Date) => void;
  currentDate: Date;
}

export const formatDateTime = (date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Tháng trong JS bắt đầu từ 0
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const formatISODate = (isoString: string) => {
  const date = new Date(isoString);
  const pad = (num: number) => num.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Tháng trong JS bắt đầu từ 0
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export default function DateTimePicker(props: DateTimePickerProps) {
  if (Platform.OS === "android") {
    return <AndroidDateTimePicker {...props} />;
  }

  if (Platform.OS === "ios") {
    return <IOSDateTimePicker {...props} />;
  }

  return null;
}

export const AndroidDateTimePicker = ({
  onChange,
  currentDate,
}: DateTimePickerProps) => {
  const formattedDate = formatDateTime(currentDate);
  const today = new Date();

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: (_, date) => {
        if (date) {
          showTimepicker(date);
        }
      },
      mode: "date",
      minimumDate: today,
    });
  };

  const showTimepicker = (selectedDate: Date) => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (_, time) => {
        if (time) {
          const newDate = new Date(selectedDate);
          newDate.setHours(time.getHours(), time.getMinutes());
          onChange(newDate);
        }
      },
      mode: "time",
    });
  };

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Text fontSize={14} bold>
        {formattedDate}
      </Text>
      <Button variant="outlined" onPress={showDatepicker}>
        Open Calendar
      </Button>
    </HStack>
  );
};

export const IOSDateTimePicker = ({
  onChange,
  currentDate,
}: DateTimePickerProps) => {
  const formattedDate = formatDateTime(currentDate);

  return (
    <HStack p={10} alignItems="center" justifyContent="space-between">
      <Text>{formattedDate}</Text>
      <RNDateTimePicker
        value={currentDate}
        mode={"datetime"}
        display="default"
        onChange={(_, date) => onChange(date || new Date())}
      />
    </HStack>
  );
};
