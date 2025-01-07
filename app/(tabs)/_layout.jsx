// IMPORTS
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { Tabs, useRootNavigationState } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import assistant from "@/assets/images/assistant.png";
import SettingsMenu from "@/views/SettingsMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

const { width, height } = Dimensions.get("screen");

const TabsLayout = () => {
  // STATES
  const [menuVisible, setMenuVisible] = useState(false);

  // CONSTS
  const animationValue = useRef(new Animated.Value(width)).current;
  const { routes } = useRootNavigationState();
  const activeTab = routes[0]?.state?.index;

  // TOGGLE MENU
  const toggleMenu = () => {
    const toValue = menuVisible ? width : 0;
    Animated.timing(animationValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

  // DEBUG
  useEffect(() => {
    console.log("ACTIVE TAB:", routes);
  }, [routes]);

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
        <Image
          source={assistant}
          className="w-28 absolute bottom-16 right-2 h-32"
          resizeMode="contain"
        />
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
};
