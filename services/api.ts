import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const url =
  Platform.OS === "android"
    ? "http://192.168.1.7:5000"
    : "http://127.0.0.1:5000";
console.log(url);

const Api: AxiosInstance = axios.create({ baseURL: url + "/api" });

Api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) config.headers.set("Authorization", `Bearer ${token}`);

  return config;
});

Api.interceptors.response.use(
  async (res: AxiosResponse) => {
    return res.data;
  },
  async (err: AxiosError) => Promise.reject(err),
);

export { Api };
