// IMPORTS
import { router, Tabs, useRootNavigationState } from "expo-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import assistant from "@/assets/images/assistant.png";
import SettingsMenu from "@/views/SettingsMenu";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useUserStore } from "@/store";
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

const { width, height } = Dimensions.get("screen");

const TabsLayout = () => {
  // STATES
  const [menuVisible, setMenuVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [hasAnimated, setHasAnimated] = useState(false);
  const userData = useUserStore((state) => state.userData);

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

  useEffect(() => {
    if (hasAnimated) return;

    const animatePopup = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1, // Fully visible
          duration: 1000, // Fade-in duration
          useNativeDriver: true,
        }),
        Animated.delay(3000), // Keep visible for 3 seconds
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out
          duration: 1000, // Fade-out duration
          useNativeDriver: true,
        }),
      ]).start(() => {
        setHasAnimated(true);
      });
    };

    animatePopup();
  }, [fadeAnim, hasAnimated]);

  const handleBotPress = () => {
    router.push("/assistant");
  };

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
          name="assistant"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#164194" : "#787A8D",
                  fontFamily: "IranSans-DemiBold",
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                پشتیبانی
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Feather name="help-circle" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="colleagues"
          options={{
            href: userData?.colleague ? "(tabs)/colleagues" : null,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#164194" : "#787A8D",
                  fontFamily: "IranSans-DemiBold",
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                همکاران
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name="handshake-o" size={20} color={color} />
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
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                ممنوعات
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Feather name="slash" size={20} color={color} />
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
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                مراکز پستی
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Feather name="map-pin" size={20} color={color} />
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
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                پست من
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Feather name="box" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#164194" : "#787A8D",
                  fontFamily: "IranSans-DemiBold",
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                خانه
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <Feather name="home" size={20} color={color} />
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

      {activeTab !== 2 && activeTab !== 0 && (
        <>
          {!keyboardVisible && (
            <Pressable onPress={handleBotPress} style={styles.bot}>
              <Image
                source={assistant}
                className="w-24 h-32"
                resizeMode="contain"
              />

              <Animated.View style={[styles.popup, { opacity: fadeAnim }]}>
                <View style={styles.triangle} />
                <Text style={styles.popupText}>چطور میتونم کمکت کنم ؟</Text>
              </Animated.View>
            </Pressable>
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
    zIndex: 200,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    position: "absolute",
    bottom: 50,
    left: 90,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  triangle: {
    position: "absolute",
    top: "50%",
    left: -8,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 10,
    borderStyle: "solid",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "white",
  },
  popupText: {
    color: "#333",
    fontSize: 12,
    fontFamily: "IranSans-Regular",
  },
  bot: {
    position: "absolute",
    left: 0,
    bottom: 60,
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
