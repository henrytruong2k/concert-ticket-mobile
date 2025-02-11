import { userService } from "@/services/user";
import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  authenticate: (
    authMode: "login" | "register",
    email: string,
    password: string,
  ) => Promise<void>;
  logout: VoidFunction;
  user: User | null;
}

const AuthContext = React.createContext({} as AuthContextProps);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthenticationProvider({
  children,
}: Readonly<React.PropsWithChildren>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //check if logged in
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");

        if (token && user) {
          setIsLoggedIn(true);
          setUser(JSON.parse(user));
          router.replace("(authed)");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  async function authenticate(
    authMode: "login" | "register",
    email: string,
    password: string,
  ) {
    try {
      setIsLoadingAuth(true);

      const response = await userService[authMode](email, password);

      if (response) {
        setIsLoggedIn(true);
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        router.replace("(authed)");
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoadingAuth(false);
    }
  }

  async function logout() {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  }

  const value = useMemo(
    () => ({
      authenticate,
      logout,
      isLoggedIn,
      isLoadingAuth,
      user,
    }),
    [isLoggedIn, isLoadingAuth, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
