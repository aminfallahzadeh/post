// IMPORTS
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { Tabs } from "expo-router";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
// import TabBar from "@/components/TabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import assistant from "@/assets/images/assistant.jpg";
import SettingsMenu from "@/views/SettingsMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const TabsLayout = () => {
  // STATES
  const [menuVisible, setMenuVisible] = useState(false);

  // CONSTS
  const animationValue = useRef(new Animated.Value(width)).current;

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
      {/* <Tabs tabBar={(props) => <TabBar {...props} />}> */}
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
                  fontSize: 14,
                  marginTop: 5,
                }}
              >
                خانه
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="hand-coin-outline"
                size={focused ? 28 : 24}
                color={color}
              />
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
                  fontSize: 14,
                  marginTop: 5,
                }}
              >
                پست من
              </Text>
            ),
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="package-variant"
                size={focused ? 28 : 24}
                color={color}
              />
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

      <Image
        source={assistant}
        className="w-32 absolute bottom-10 left-0"
        resizeMode="contain"
      />
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
