// IMPORTS
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  BackHandler,
  Pressable,
  Keyboard,
} from "react-native";
import { Tabs, useRootNavigationState } from "expo-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import assistant from "@/assets/images/assistant.png";
import SettingsMenu from "@/views/SettingsMenu";
import Feather from "@expo/vector-icons/Feather";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("screen");

const TabsLayout = () => {
  // STATES
  const [menuVisible, setMenuVisible] = useState(false);
  const [botVisible, setBotVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // CONSTS
  const animationValue = useRef(new Animated.Value(width)).current;
  const { routes } = useRootNavigationState();
  const activeTab = routes[routes.length - 1]?.state?.index;

  // TOGGLE MENU
  const toggleMenu = useCallback(() => {
    const toValue = menuVisible ? width : 0;
    Animated.timing(animationValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  }, [animationValue, menuVisible]);

  const handleClose = () => {
    setBotVisible(false);
  };

  const handleOpen = () => {
    setBotVisible(true);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // HANDLE BACK
  useEffect(() => {
    const backAction = () => {
      if (menuVisible) {
        toggleMenu();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [menuVisible, toggleMenu]);

  return (
    <>
      {/* TOP BAR */}
      <SafeAreaView>
        <View style={styles.topBar}>
          <Text
            style={styles.title}
            className="text-primary font-bold text-[20px]"
          >
            POST
            <Text className="text-secondary">.IR</Text>
          </Text>

          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={35} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* TAB LAYOUT */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#164194",
          tabBarInactiveTintColor: "#333",
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 65,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#164194" : "#787A8D",
                  fontFamily: "IranSans-DemiBold",
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                خانه
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Feather name="home" size={focused ? 28 : 22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mypost"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#164194" : "#787A8D",
                  fontFamily: "IranSans-DemiBold",
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                پست من
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Feather name="box" size={focused ? 28 : 22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="map"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#164194" : "#787A8D",
                  fontFamily: "IranSans-DemiBold",
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                مراکز پستی
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Feather name="map-pin" size={focused ? 28 : 22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="forbidden"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#164194" : "#787A8D",
                  fontFamily: "IranSans-DemiBold",
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                ممنوعات
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Feather name="slash" size={focused ? 28 : 22} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* BURGER MENU OVERLAY */}
      <Animated.View
        style={[
          styles.menuOverlay,
          { transform: [{ translateX: animationValue }] },
        ]}
      >
        <SettingsMenu closeHandler={toggleMenu} />
      </Animated.View>

      {activeTab !== 2 && (
        <>
          {!keyboardVisible && (
            <Pressable onPress={handleOpen}>
              <Image
                source={assistant}
                className="w-28 absolute bottom-16 right-2 h-32"
                resizeMode="contain"
              />
              <Animated.View style={[styles.popup]}>
                <View style={styles.triangle} />
                <Text style={styles.popupText}>چطور میتونم کمکت کنم ؟</Text>
              </Animated.View>
            </Pressable>
          )}

          {botVisible && !keyboardVisible && (
            <View style={styles.overlay}>
              <View style={styles.bot}>
                <Pressable onPress={handleClose} style={styles.close}>
                  <Feather name="x" size={24} color="black" />
                </Pressable>
                <WebView source={{ uri: "https://newpostkhoone.post.ir" }} />
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default TabsLayout;

const styles = {
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { height: 2, width: 0 },
    marginTop: 10,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width,
    height: height,
    backgroundColor: "#fff",
    zIndex: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    position: "absolute",
    bottom: 120,
    right: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  triangle: {
    position: "absolute",
    top: "50%",
    right: -8,
    transform: [{ translateY: -5 }],
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#fff",
  },
  popupText: {
    color: "#333",
    fontSize: 14,
    fontFamily: "IranSans-DemiBold",
  },
  bot: {
    position: "absolute",
    bottom: height / 2 - 300,
    left: width / 2 - 175,
    width: 350,
    height: 600,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
  },
  close: {
    flexDirection: "row-reverse",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
};
